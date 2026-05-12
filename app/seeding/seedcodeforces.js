// insert-topics.js
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const { createClient } = await import("@supabase/supabase-js");

// ======================
// SUPABASE CONFIG
// ======================

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);

// ==============================================================================================
// HELPERS

// Capitalize each word in a topic name to avoid duplicates like "dynamic programming" vs "Dynamic Programming"
function toTitleCase(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Find difficulty based on rating
function getDifficulty(rating) {
  if (rating == 0) return "NA";
  if (rating >= 1700) return "Hard";
  if (rating >= 1300) return "Medium";
  return "Easy";
}

// ==============================================================================================================
// FETCH QUESTIONS

async function fetchQuestions() {
  try {
    const response = await fetch(
      "http://localhost:3000/api/codeforces/sync-all",
    );

    const questions = await response.json();
    return questions?.sample || [];
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    return [];
  }
}

// ==============================================================================================================
// UPSERT TOPICS

async function upsertTopics(tagNames) {
  const uniqueTags = [...new Set(tagNames.map(toTitleCase))];

  if (uniqueTags.length === 0) return {};

  // Fetch already existing topics
  const { data: existingTopics, error: fetchError } = await supabase
    .from("Topic")
    .select("topic_id, topic_name")
    .in("topic_name", uniqueTags);

  if (fetchError) {
    console.error("Error fetching existing topics:", fetchError);
    return {};
  }

  const existingMap = {};
  for (const t of existingTopics) {
    existingMap[t.topic_name] = t.topic_id;
  }

  // Find topics that are NOT yet in the DB
  const newTags = uniqueTags.filter((tag) => !(tag in existingMap));

  if (newTags.length > 0) {
    const { data: insertedTopics, error: insertError } = await supabase
      .from("Topic")
      .insert(newTags.map((tag) => ({ topic_name: tag })))
      .select("topic_id, topic_name");

    if (insertError) {
      console.error("Error inserting new topics:", insertError);
    } else {
      for (const t of insertedTopics) {
        existingMap[t.topic_name] = t.topic_id;
      }
      console.log(`Inserted ${newTags.length} new topic(s):`, newTags);
    }
  } else {
    console.log("No new topics to insert.");
  }

  return existingMap; // { "Dynamic Programming": 3, "Math": 1, ... }
}
// ==============================================================================================================
// INSERT QUESTIONS

async function insertQuestions(questions) {
  if (questions.length === 0) return [];

  const formattedQuestions = questions.map((q) => ({
    platform_id: 2,
    external_question_id: "CF" + q.problemId,
    question_title: q.title,
    difficulty: getDifficulty(q.rating),
    problem_url: q.url,
  }));

  // Use upsert with external_question_id as the conflict key to avoid duplicates
  const { data: insertedQuestions, error } = await supabase
    .from("Question")
    .upsert(formattedQuestions, { onConflict: "external_question_id" })
    .select("question_id, external_question_id");

  if (error) {
    console.error("Supabase Insert Error (Questions):", error);
    return [];
  }

  console.log(`Upserted ${insertedQuestions.length} question(s).`);
  return insertedQuestions; // [{ question_id, external_question_id }, ...]
}

// ==============================================================================================================
// INSERT QUESTION-TOPIC LINKS

async function insertQuestionTopics(questions, insertedQuestions, topicMap) {
  // Build a lookup: external_question_id -> question_id
  const questionIdMap = {};
  for (const q of insertedQuestions) {
    questionIdMap[q.external_question_id] = q.question_id;
  }

  const questionTopicRows = [];

  for (const q of questions) {
    const externalId = "CF" + q.problemId;
    const questionId = questionIdMap[externalId];

    if (!questionId) {
      console.warn(`Could not find question_id for external ID: ${externalId}`);
      continue;
    }

    const tags = q.tags || [];
    for (const tag of tags) {
      const topicName = toTitleCase(tag);
      const topicId = topicMap[topicName];

      if (!topicId) {
        console.warn(`Could not find topic_id for topic: ${topicName}`);
        continue;
      }

      questionTopicRows.push({
        question_id: questionId,
        topic_id: topicId,
      });
    }
  }

  if (questionTopicRows.length === 0) {
    console.log("No QuestionTopic entries to insert.");
    return;
  }

  // Upsert to avoid duplicate links if script is re-run
  const { error } = await supabase
    .from("QuestionTopic")
    .upsert(questionTopicRows, { onConflict: "question_id,topic_id" });

  if (error) {
    console.error("Supabase Insert Error (QuestionTopic):", error);
    return;
  }

  console.log(`Upserted ${questionTopicRows.length} QuestionTopic link(s).`);
}

// ==============================================================================================================
// MAIN

async function main() {
  console.log("Fetching questions from Codeforces sync...");
  const questions = await fetchQuestions();

  if (questions.length === 0) {
    console.log("No questions found. Exiting.");
    return;
  }

  console.log(`Fetched ${questions.length} question(s).`);

  // Collect all tags across all questions
  const allTags = questions.flatMap((q) => q.tags || []);

  // Step 1: Upsert topics and get topicName -> topic_id map
  console.log("\n--- Upserting Topics ---");
  const topicMap = await upsertTopics(allTags);

  // Step 2: Insert/upsert questions
  console.log("\n--- Upserting Questions ---");
  const insertedQuestions = await insertQuestions(questions);

  // Step 3: Insert QuestionTopic links
  console.log("\n--- Inserting QuestionTopic Links ---");
  await insertQuestionTopics(questions, insertedQuestions, topicMap);

  console.log("\nDone!");
}

main();

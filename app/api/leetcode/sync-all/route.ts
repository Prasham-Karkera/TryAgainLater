// ✅ This is the correct Next.js App Router syntax
import { NextResponse } from 'next/server';

export async function GET() {
  const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";
  
  const query = `
    query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
      questionList(
        categorySlug: $categorySlug
        limit: $limit
        skip: $skip
        filters: $filters
      ) {
        data {
          questionId
          title
          titleSlug
          difficulty
          topicTags {
            name
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(LEETCODE_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: { categorySlug: "", skip: 0, limit: 100, filters: {} },
      }),
    });

    const result = await response.json();
    const rawQuestions = result.data.questionList.data;

    const formatted = rawQuestions.map((q: any) => ({
      problemId: `LC_${q.titleSlug}`,
      title: q.title,
      difficulty: q.difficulty,
      tags: q.topicTags.map((t: any) => t.name),
      link: `https://leetcode.com/problems/${q.titleSlug}/`
    }));

    return NextResponse.json({ sample: formatted });
  } catch (error) {
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}
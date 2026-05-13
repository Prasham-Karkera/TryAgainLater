import { NextResponse } from "next/server";

type RecentAcceptedSubmission = {
  title: string;
  titleSlug: string;
};

type LeetCodeQuestion = {
  questionId?: string;
  title: string;
  titleSlug: string;
  difficulty?: number;
};

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";

async function postLeetCodeGraphQL<TData>(
  query: string,
  variables: Record<string, unknown>,
) {
  const url = new URL(LEETCODE_GRAPHQL_URL);
  url.searchParams.set("query", query);

  if (Object.keys(variables).length > 0) {
    url.searchParams.set("variables", JSON.stringify(variables));
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      Accept: "application/json, text/plain, */*",
    },
  });

  if (!response.ok) {
    throw new Error(`LeetCode GraphQL request failed: ${response.status}`);
  }

  const result = (await response.json()) as {
    data?: TData;
    errors?: Array<{ message: string }>;
  };

  if (result.errors?.length) {
    throw new Error(result.errors[0].message);
  }

  if (!result.data) {
    throw new Error("LeetCode GraphQL response was empty");
  }

  return result.data;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 },
    );
  }

  try {
    const recentAcceptedQuery = `
      query recentAcSubmissions($username: String!) {
        recentAcSubmissionList(username: $username) {
          title
          titleSlug
        }
      }
    `;

    const recentAcceptedData = await postLeetCodeGraphQL<{
      recentAcSubmissionList: RecentAcceptedSubmission[];
    }>(recentAcceptedQuery, { username: username.toLowerCase() });

    const uniqueSlugs = Array.from(
      new Map(
        recentAcceptedData.recentAcSubmissionList.map((submission) => [
          submission.titleSlug,
          submission,
        ]),
      ).values(),
    ).slice(0, 20);

    if (!uniqueSlugs.length) {
      return NextResponse.json(
        { error: `No data found for user: ${username}` },
        { status: 404 },
      );
    }

    const questionDataQuery = uniqueSlugs
      .map(
        (submission, index) => `
          question${index}: question(titleSlug: ${JSON.stringify(submission.titleSlug)}) {
            questionId
            title
            titleSlug
            difficulty
          }
        `,
      )
      .join("\n");

    const questionData = await postLeetCodeGraphQL<Record<string, LeetCodeQuestion>>(
      `
        query questionDataBatch {
          ${questionDataQuery}
        }
      `,
      {},
    );

    const solved = Object.values(questionData)
      .filter((question): question is LeetCodeQuestion => Boolean(question))
      .slice(0, 20)
      .map((question) => ({
        problemId: question.questionId ? `LC_${question.questionId}` : `LC_${question.titleSlug}`,
        title: question.title,
        titleSlug: question.titleSlug,
        difficulty: question.difficulty,
      }));

    console.log(
      `📖 Reading GraphQL: Returning ${solved.length} problems for ${username}`,
    );

    return NextResponse.json({
      success: true,
      username: username,
      count: solved.length,
      problemIds: solved, // Frontend expects this key
    });
  } catch (error) {
    console.error("Solved Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

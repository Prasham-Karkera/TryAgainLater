import requests

def fetch_leetcode_stats(username: str, session_cookie: str = None):
    """
    Fetch LeetCode stats.
    If session_cookie is provided, fetch full solved problems.
    Otherwise, fallback to public profile stats counts.
    """
    url_stats = "https://leetcode.com/graphql"
    headers = {
        "User-Agent": "Mozilla/5.0",
        "Referer": f"https://leetcode.com/{username}/"
    }

    if session_cookie:
        headers["Cookie"] = f"LEETCODE_SESSION={session_cookie}"

    # Query for user submission stats
    stats_query = """
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
    """

    try:
        res_stats = requests.post(url_stats, json={"query": stats_query, "variables": {"username": username}}, headers=headers)
        if res_stats.status_code != 200:
            return {"error": f"Failed to fetch LeetCode stats (status {res_stats.status_code})"}

        stats_data = res_stats.json().get("data", {}).get("matchedUser", {})
        result = {
            "username": username,
            "stats": stats_data.get("submitStats", {})
        }

        if session_cookie:
            # Fetch solved problems using authenticated endpoint
            solved_problems = set()
            page = 0
            has_next = True
            while has_next:
                submissions_url = f"https://leetcode.com/api/submissions/?offset={page*20}&limit=20&lastkey="
                res_subs = requests.get(submissions_url, headers=headers)
                if res_subs.status_code != 200:
                    break
                data = res_subs.json()
                for sub in data.get("submissions_dump", []):
                    if sub.get("status_display") == "Accepted":
                        solved_problems.add(sub.get("title_slug"))
                has_next = data.get("has_next", False)
                page += 1

            result["solved_problems"] = list(solved_problems)
            result["note"] = "Full solved problem list fetched using session cookie"

        else:
            result["note"] = "Full problem list requires login; public profile returns counts only"

        return result

    except Exception as e:
        return {"error": str(e)}

from fastapi import FastAPI
from datetime import datetime, timedelta
from app.services.leetcode import fetch_leetcode_stats
from app.services.codeforces import fetch_codeforces_stats

app = FastAPI()
REFRESH_INTERVAL = timedelta(hours=12)

# In-memory cache keyed by internal_username
cache = {}

# In-memory revision queue and notes
revision_queue = {}
notes = {}

@app.get("/stats/{internal_username}")
def get_stats(
    internal_username: str,
    leetcode_username: str,
    codeforces_handle: str,
    leetcode_cookie: str = None,
    force_refresh: bool = False
):
    """
    internal_username: app user
    leetcode_username: LeetCode username
    codeforces_handle: Codeforces handle
    leetcode_cookie: optional LEETCODE_SESSION
    """
    now = datetime.utcnow()
    user_cache = cache.get(internal_username)

    if (not user_cache) or force_refresh or (now - user_cache["last_updated"] > REFRESH_INTERVAL):
        # Fetch data
        leet_data = fetch_leetcode_stats(leetcode_username, session_cookie=leetcode_cookie)
        cf_data = fetch_codeforces_stats(codeforces_handle)
        
        data = {
            "internal_username": internal_username,
            "handles": {
                "leetcode": leetcode_username,
                "codeforces": codeforces_handle
            },
            "leetcode_data": leet_data,
            "codeforces_data": cf_data,
            "last_updated": now
        }
        cache[internal_username] = data

        # Initialize revision queue and notes if not present
        if internal_username not in revision_queue:
            revision_queue[internal_username] = cf_data["solved_problems"] 
        if internal_username not in notes:
            notes[internal_username] = {}

        return data
    else:
        return user_cache

@app.post("/notes/{internal_username}")
def add_note(internal_username: str, problem_id: str, note_text: str):
    """
    Add a note/hint for a specific problem
    """
    if internal_username not in notes:
        notes[internal_username] = {}
    notes[internal_username][problem_id] = note_text
    return {"status": "ok", "problem_id": problem_id, "note": note_text}

@app.get("/notes/{internal_username}")
def fetch_note(internal_username: str, problem_id: str,):
    return {"status" : "ok", "problem_id" : problem_id, "note" : notes[internal_username][problem_id]}

@app.get("/revision/{internal_username}")
def get_revision(internal_username: str, count: int = 5):
    """
    Get a small batch of problems to revise
    """
    queue = revision_queue.get(internal_username, [])
    batch = queue[:count]
    revision_queue[internal_username] = queue[count:] + batch
    return {"revision_batch": batch}

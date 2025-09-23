from fastapi import FastAPI
from datetime import datetime, timedelta
from app.services.leetcode import fetch_leetcode_stats
from app.services.codeforces import fetch_codeforces_stats
from app.db import (
    upsert_user, save_platform_stats, get_platform_stats,
    save_revision_queue, get_revision_queue,
    add_note, get_note
)
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "*",  # Allows all origins
    # Example for production:
    # "http://localhost:3000",
    # "https://your-frontend-domain.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)
REFRESH_INTERVAL = timedelta(hours=12)


@app.get("/stats/{internal_username}")
async def get_stats(
    internal_username: str,
    leetcode_username: str,
    codeforces_handle: str,
    leetcode_cookie: str = None,
    force_refresh: bool = False
):
    now = datetime.utcnow()
    cached = await get_platform_stats(internal_username)

    if (not cached) or force_refresh or (now - cached.get("last_updated", now) > REFRESH_INTERVAL):
        leet_data = fetch_leetcode_stats(
            leetcode_username, session_cookie=leetcode_cookie)
        cf_data = fetch_codeforces_stats(codeforces_handle)

        await upsert_user(internal_username, leetcode_username, codeforces_handle)
        await save_platform_stats(internal_username, leet_data, cf_data)

        queue = await get_revision_queue(internal_username)
        if not queue:
            await save_revision_queue(internal_username, cf_data["solved_problems"])

        return {
            "internal_username": internal_username,
            "leetcode_data": leet_data,
            "codeforces_data": cf_data,
            "last_updated": now
        }
    if cached and "_id" in cached:
        cached["_id"] = str(cached["_id"])
    
    # return cached

    return cached


@app.post("/notes/{internal_username}")
async def add_problem_note(internal_username: str, problem_id: str, note_text: str):
    await add_note(internal_username, problem_id, note_text)
    return {"status": "ok", "problem_id": problem_id, "note": note_text}


@app.get("/notes/{internal_username}")
async def fetch_problem_note(internal_username: str, problem_id: str):
    note = await get_note(internal_username, problem_id)
    return {"status": "ok", "problem_id": problem_id, "note": note}


@app.get("/revision/{internal_username}")
async def get_revision(internal_username: str, count: int = 5):
    queue = await get_revision_queue(internal_username)
    batch = queue[:count]
    updated_queue = queue[count:] + batch
    await save_revision_queue(internal_username, updated_queue)
    return {"revision_batch": batch}

from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
import os
from dotenv import load_dotenv
from urllib.parse import quote_plus

load_dotenv(os.path.join(os.path.dirname(__file__), "../../.env.local"))

raw_uri = os.getenv("MONO_URI", "mongodb://localhost:27017")

if "mongodb+srv://" in raw_uri and "<db_password>" in raw_uri:
    
    mongo_password = os.getenv("MONGO_PASSWORD", "")
    if mongo_password:
        encoded_password = quote_plus(mongo_password)
        MONGO_URI = raw_uri.replace("<db_password>", encoded_password)
    else:
        print("Warning: MONGO_PASSWORD not found in environment variables")
        MONGO_URI = raw_uri
else:
    MONGO_URI = raw_uri
client = AsyncIOMotorClient(MONGO_URI)
db = client["coding_dashboard"]


users_col = db["users"]
platform_stats_col = db["platform_stats"]
revision_col = db["revision_queue"]
notes_col = db["notes"]


async def upsert_user(internal_username, leetcode_username, codeforces_handle):
    await users_col.update_one(
        {"internal_username": internal_username},
        {"$set": {
            "leetcode": leetcode_username,
            "codeforces": codeforces_handle,
            "last_updated": datetime.utcnow()
        }},
        upsert=True
    )


async def save_platform_stats(internal_username, leet_data, cf_data):
    await platform_stats_col.update_one(
        {"internal_username": internal_username},
        {"$set": {
            "leetcode_data": leet_data,
            "codeforces_data": cf_data,
            "last_updated": datetime.utcnow()
        }},
        upsert=True
    )


async def get_platform_stats(internal_username):
    return await platform_stats_col.find_one({"internal_username": internal_username})


async def save_revision_queue(internal_username, queue):
    await revision_col.update_one(
        {"internal_username": internal_username},
        {"$set": {"queue": queue}},
        upsert=True
    )


async def get_revision_queue(internal_username):
    doc = await revision_col.find_one({"internal_username": internal_username})
    return doc.get("queue", []) if doc else []


async def add_note(internal_username, problem_id, note_text):
    await notes_col.update_one(
        {"internal_username": internal_username},
        {"$set": {f"notes.{problem_id}": note_text}},
        upsert=True
    )


async def get_note(internal_username, problem_id):
    doc = await notes_col.find_one({"internal_username": internal_username}, {"notes": 1})
    return doc.get("notes", {}).get(problem_id) if doc else None

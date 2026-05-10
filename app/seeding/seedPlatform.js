// insert-topics.js
require("dotenv").config({ path: ".env.local" });

const { createClient } = require("@supabase/supabase-js");

// ======================
// SUPABASE CONFIG
// ======================
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);

// ======================
// platforms ARRAY
// ======================
const platforms = [
  {
    name: "LeetCode",
    url: "https://leetcode.com/",
  },
  {
    name: "codeforces",
    url: "https://codeforces.com/",
  },
];

// ======================
// INSERT FUNCTION
// ======================
async function insertPlatforms() {
  const formattedPlatforms = platforms.map((platform) => ({
    platform_name: platform.name,
    platform_url: platform.url,
  }));

  const { data, error } = await supabase
    .from("Platform")
    .insert(formattedPlatforms);

  if (error) {
    console.error("Error inserting platforms:", error);
    return;
  }

  console.log("Platforms inserted successfully");
  console.log(data);
}

insertPlatforms();

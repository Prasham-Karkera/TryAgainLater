import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const fetchStats = async (internalUsername: string, leetcodeUsername: string, codeforcesHandle: string, leetcodeCookie?: string) => {
  const res = await axios.get(`${BASE_URL}/stats/${internalUsername}`, {
    params: { leetcode_username: leetcodeUsername, codeforces_handle: codeforcesHandle, leetcode_cookie: leetcodeCookie }
  });
  return res.data;
};

export const fetchRevision = async (internalUsername: string, count: number = 5) => {
  const res = await axios.get(`${BASE_URL}/revision/${internalUsername}`, {
    params: { count }
  });
  return res.data;
};

export const addNote = async (internalUsername: string, problemId: string, note: string) => {
  const res = await axios.post(`${BASE_URL}/notes/${internalUsername}`, { problem_id: problemId, note });
  return res.data;
};


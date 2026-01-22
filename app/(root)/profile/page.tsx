"use client";

import { useState } from "react";

export default function AdminSyncPage() {
  const [userId, setUserId] = useState("");
  const [contestId, setContestId] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
   
  // State to hold whatever data we just fetched
  const [displayData, setDisplayData] = useState<{
    type: "all" | "user" | "contest" | null;
    items: any[];
  }>({ type: null, items: [] });

  const syncAllProblems = async () => {
    setLoading("all");
    const res = await fetch("/api/codeforces/sync-all");
    const data = await res.json();
    // Assuming the API returns a 'sample' or 'allProblems' array
    setDisplayData({ type: "all", items: data.sample || [] });
    setLoading(null);
  };

  const syncUserSolved = async () => {
    if (!userId) return;
    setLoading("user");
    const res = await fetch(`/api/codeforces/solved?handle=${userId}`);
    const data = await res.json();
    setDisplayData({ type: "user", items: data.problemIds || [] });
    setLoading(null);
  };

  const syncContest = async () => {
    if (!contestId) return;
    setLoading("contest");
    const res = await fetch(`/api/codeforces/sync-contest?contestId=${contestId}`);
    const data = await res.json();
    setDisplayData({ type: "contest", items: data.problems || [] });
    setLoading(null);
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50 flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold text-gray-800">Try Again Later</h1>

      {/* Control Panel */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <button onClick={syncAllProblems} className="w-full bg-blue-600 text-white p-2 rounded">
            {loading === "all" ? "Loading..." : "View All Problems"}
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border flex gap-2">
          <input value={userId} onChange={e => setUserId(e.target.value)} placeholder="User Handle" className="border p-1 w-full rounded" />
          <button onClick={syncUserSolved} className="bg-black text-white px-3 rounded">Submit</button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border flex gap-2">
          <input value={contestId} onChange={e => setContestId(e.target.value)} placeholder="Contest ID" className="border p-1 w-full rounded" />
          <button onClick={syncContest} className="bg-green-600 text-white px-3 rounded">Submit</button>
        </div>
      </div>

      {/* Results Display Area */}
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4 uppercase text-gray-500 tracking-widest">
          {displayData.type ? `Results: ${displayData.type}` : "No Data Fetched"}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayData.items.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg border shadow-sm hover:border-blue-500 transition">
              {/* If item is just a string (Problem ID) */}
              {typeof item === "string" ? (
                <p className="font-mono font-bold text-lg text-blue-600">{item}</p>
              ) : (
                /* If item is a Problem Object */
                <>
                  <p className="text-xs text-gray-400 font-mono">{item.problemId}</p>
                  <p className="font-bold text-gray-800 leading-tight">{item.title}</p>
                  <div className="mt-2 flex gap-1 flex-wrap">
                    {item.tags?.slice(0, 2).map((tag: string) => (
                      <span key={tag} className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
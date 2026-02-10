"use client";

import { useState } from "react";

type Platform = "codeforces" | "leetcode";

export default function AdminSyncPage() {
  const [userId, setUserId] = useState("");
  const [contestId, setContestId] = useState("");
  const [platform, setPlatform] = useState<Platform>("codeforces");
  const [loading, setLoading] = useState<string | null>(null);

  const [displayData, setDisplayData] = useState<{
    type: string | null;
    items: any[];
    platform: Platform;
  }>({ type: null, items: [], platform: "codeforces" });

  const syncAll = async () => {
    setLoading("all");
    const endpoint = platform === "codeforces" ? "/api/codeforces/sync-all" : "/api/leetcode/sync-all";
    const res = await fetch(endpoint);
    const data = await res.json();
    console.log(data);
    setDisplayData({ type: "All Problems", items: data.sample || [], platform });
    setLoading(null);
  };

  const syncUser = async () => {
    if (!userId) return;
    setLoading("user");
    const endpoint = platform === "codeforces" 
      ? `/api/codeforces/solved?handle=${userId}` 
      : `/api/leetcode/solved?username=${userId}`; // Future extension endpoint
    const res = await fetch(endpoint);
    const data = await res.json();
    setDisplayData({ type: `User: ${userId}`, items: data.problemIds || [], platform });
    setLoading(null);
  };

  const syncContest = async () => {
    if (!contestId) return;
    setLoading("contest");
    const endpoint = platform === "codeforces" 
      ? `/api/codeforces/sync-contest?contestId=${contestId}` 
      : `/api/leetcode/sync-contest?contestSlug=${contestId}`;
    const res = await fetch(endpoint);
    const data = await res.json();
    console.log("Contest");
    console.log(data);
    setDisplayData({ type: `Contest: ${contestId}`, items: data.problems || [], platform });
    setLoading(null);
  };

  return (
    <main className="min-h-screen p-8 bg-[#0b0e14] text-gray-200 flex flex-col items-center gap-8 font-sans">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-black tracking-tighter text-white">
          TRY AGAIN <span className="text-yellow-500">LATER</span>
        </h1>
        <p className="text-gray-500 text-sm font-mono">Platform Sync Dashboard v2.0</p>
      </div>

      {/* Platform Toggle */}
      <div className="flex bg-gray-900 p-1 rounded-xl border border-gray-800 shadow-inner">
        <button 
          onClick={() => setPlatform("codeforces")}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${platform === 'codeforces' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
        >
          CODEFORCES
        </button>
        <button 
          onClick={() => setPlatform("leetcode")}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${platform === 'leetcode' ? 'bg-yellow-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
        >
          LEETCODE
        </button>
      </div>

      {/* Control Panel */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 flex flex-col justify-between">
          <p className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest">Global Sync</p>
          <button onClick={syncAll} className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition">
            {loading === "all" ? "Feteching..." : `Seed ${platform === 'leetcode' ? 'LC' : 'CF'}`}
          </button>
        </div>

        <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
          <p className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest">User Progress</p>
          <div className="flex gap-2">
            <input value={userId} onChange={e => setUserId(e.target.value)} placeholder={`${platform} handle`} className="bg-black border border-gray-800 p-3 w-full rounded-xl text-sm focus:border-blue-500 outline-none" />
            <button onClick={syncUser} className="bg-gray-800 hover:bg-gray-700 text-white px-4 rounded-xl font-bold transition">
              {loading === "user" ? "..." : "Sync"}
            </button>
          </div>
        </div>

        <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
          <p className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest">Contest Update</p>
          <div className="flex gap-2">
            <input value={contestId} onChange={e => setContestId(e.target.value)} placeholder={platform === 'leetcode' ? "weekly-contest-XXX" : "Contest ID"} className="bg-black border border-gray-800 p-3 w-full rounded-xl text-sm focus:border-green-500 outline-none" />
            <button onClick={syncContest} className="bg-gray-800 hover:bg-gray-700 text-white px-4 rounded-xl font-bold transition">
              {loading === "contest" ? "..." : "Sync"}
            </button>
          </div>
        </div>
      </div>

      {/* Results Display Area */}
      <div className="w-full max-w-5xl">
        <div className="flex justify-between items-end mb-6 border-b border-gray-800 pb-4">
          <h2 className="text-2xl font-bold text-white">
            {displayData.type ? displayData.type : "Ready for Sync"}
          </h2>
          <span className="text-xs font-mono text-gray-600">{displayData.items.length} RESULTS</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayData.items.map((item, idx) => (
            <div key={idx} className="bg-gray-900 p-5 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all group">
              {typeof item === "string" ? (
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${displayData.platform === 'leetcode' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                  <p className="font-mono font-bold text-lg text-white group-hover:text-yellow-500">{item}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-gray-500">{item.problemId}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.difficulty === 'Hard' ? 'bg-red-900/20 text-red-500' : 'bg-gray-800 text-gray-400'}`}>
                      {item.difficulty || item.rating}
                    </span>
                  </div>
                  <p className="font-bold text-white leading-tight line-clamp-2">{item.title}</p>
                  <div className="flex gap-2 flex-wrap">
                    {item.tags?.slice(0, 3).map((tag: string) => (
                      <span key={tag} className="text-[9px] uppercase tracking-wider bg-black border border-gray-800 text-gray-500 px-2 py-1 rounded-md">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
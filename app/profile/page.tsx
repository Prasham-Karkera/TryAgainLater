"use client";

import { useState, useEffect } from "react";

type Platform = "codeforces" | "leetcode";

interface ProblemItem {
  problemId: string;
  title: string;
  titleSlug?: string;
  difficulty?: string | number;
}

export default function AdminSyncPage() {
  const [userId, setUserId] = useState("");
  const [platform, setPlatform] = useState<Platform>("leetcode");
  const [loading, setLoading] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const [displayData, setDisplayData] = useState<{
    type: string | null;
    items: ProblemItem[];
    platform: Platform;
  }>({ type: null, items: [], platform: "leetcode" });

  // Auto-check registration as you type (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (userId && platform === 'leetcode') checkRegistration();
    }, 500);
    return () => clearTimeout(timer);
  }, [userId]);

  const checkRegistration = async () => {
    try {
      const res = await fetch(`/api/leetcode/status?username=${userId.toLowerCase()}`);
      const data = await res.json();
      setIsRegistered(data.registered);
    } catch (e) {
      setIsRegistered(false);
    }
  };

  const loadData = async () => {
    if (!userId) return;
    setLoading(true);
    setSyncStatus(`Syncing ${platform} history...`);

    try {
      let endpoint = "";
      if (platform === "leetcode") {
        endpoint = `/api/leetcode/solved?username=${userId.toLowerCase()}`;
      } else {
        // Codeforces logic: typically hits their public API
        endpoint = `https://codeforces.com/api/user.status?handle=${userId}&from=1&count=1000`;
      }

      const res = await fetch(endpoint);
      const data = await res.json();

      if (platform === "leetcode") {
        if (res.ok && data.problemIds) {
          setDisplayData({ type: `LeetCode: ${userId}`, items: data.problemIds, platform });
          setSyncStatus(null);
        } else {
          setSyncStatus("No LeetCode local cache found. Use Extension.");
        }
      } else {
        // CODEFORCES MAPPING
        if (data.status === "OK") {
          const solved = data.result
            .filter((sub: any) => sub.verdict === "OK")
            .map((sub: any) => ({
              problemId: `${sub.problem.contestId}${sub.problem.index}`,
              title: sub.problem.name,
              difficulty: sub.problem.rating || "Unrated"
            }));
          
          // Remove duplicates (CF API returns every successful submission)
          const uniqueSolved = Array.from(new Map(solved.map((p:any) => [p.problemId, p])).values());
          
          setDisplayData({ type: `Codeforces: ${userId}`, items: uniqueSolved as ProblemItem[], platform });
          setSyncStatus(null);
        }
      }
    } catch (error) {
      setSyncStatus("Sync failed. Check connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-[#0a0a0b] text-zinc-300 flex flex-col items-center gap-10">
      {/* HEADER SECTION */}
      <header className="text-center space-y-2">
        <h1 className="text-5xl font-black italic tracking-tighter text-white">
          TRY AGAIN <span className="text-amber-500 underline decoration-2 underline-offset-8">LATER</span>
        </h1>
        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em]">
          Multi-Platform Archive <span className="text-zinc-700">|</span> v2.6
        </p>
      </header>

      {/* AUTH BADGE (LeetCode Only) */}
      {platform === 'leetcode' && isRegistered && (
        <div className="flex items-center gap-3 bg-emerald-500/5 border border-emerald-500/20 px-6 py-2 rounded-full animate-pulse">
          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Local Cache Established</p>
        </div>
      )}

      {/* CONTROL PANEL */}
      <div className="w-full max-w-xl bg-zinc-900/40 p-1 rounded-[2.5rem] border border-zinc-800 shadow-2xl">
        <div className="bg-zinc-950/50 p-8 rounded-[2.2rem] flex flex-col gap-6">
          <div className="flex justify-between items-center bg-zinc-900/50 p-1 rounded-xl">
            {(['leetcode', 'codeforces'] as const).map(p => (
              <button 
                key={p}
                onClick={() => { setPlatform(p); setDisplayData({type: null, items: [], platform: p}); }}
                className={`flex-1 py-2 text-[10px] font-black uppercase tracking-tighter rounded-lg transition-all ${
                  platform === p 
                  ? (p === 'leetcode' ? 'bg-amber-500 text-black' : 'bg-blue-500 text-white') 
                  : 'text-zinc-600 hover:text-zinc-400'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          
          <div className="flex gap-3">
            <input 
              value={userId} 
              onChange={e => setUserId(e.target.value)} 
              placeholder={`Enter ${platform} handle...`} 
              className="bg-black border border-zinc-800 p-4 w-full rounded-2xl text-sm focus:border-zinc-700 outline-none transition-all" 
            />
            <button 
              onClick={loadData} 
              disabled={loading || !userId}
              className="bg-zinc-100 text-black px-8 rounded-2xl font-black hover:bg-white active:scale-95 transition-all disabled:opacity-20"
            >
              {loading ? "..." : "LOAD"}
            </button>
          </div>
          {syncStatus && <p className="text-[10px] font-mono text-center text-zinc-500 uppercase">{syncStatus}</p>}
        </div>
      </div>

      {/* RESULTS GRID */}
      <section className="w-full max-w-6xl space-y-8">
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
            {displayData.type || "Ready to sync"}
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
          <span className="text-sm font-black text-white bg-zinc-900 px-4 py-1 rounded-lg border border-zinc-800">
            {displayData.items.length}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayData.items.map((item, idx) => (
            <div key={idx} className="bg-zinc-900/30 p-6 rounded-[2rem] border border-zinc-800/50 hover:bg-zinc-900/50 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                 <div className={`text-[8px] font-black px-2 py-1 rounded-md uppercase ${
                    platform === 'leetcode' 
                    ? (item.difficulty === 3 ? 'bg-red-500/10 text-red-500' : item.difficulty === 2 ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500')
                    : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {platform === 'leetcode' 
                      ? (item.difficulty === 3 ? 'Hard' : item.difficulty === 2 ? 'Med' : 'Easy')
                      : item.difficulty
                    }
                  </div>
              </div>
              <div className="flex flex-col gap-4 mt-2">
                <div className={`w-8 h-[2px] ${platform === 'leetcode' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                <p className="font-bold text-zinc-200 text-sm leading-tight line-clamp-2">
                  {item.title}
                </p>
                <p className="text-[10px] font-mono text-zinc-600 truncate">
                  {item.problemId}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
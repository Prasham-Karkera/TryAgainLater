// app/dashboard/page.tsx
"use client";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import AnalyticsView from "./analytics/page"; // We'll reuse your analytics page as a component

// A simple loading spinner component
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    <p className="mt-4 text-gray-600">Fetching your stats...</p>
  </div>
);

export default function DashboardPage() {
  const [credentials, setCredentials] = useState({
    cfHandle: "",
    lcUsername: "",
    lcCookie: "",
  });
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.cfHandle || !credentials.lcUsername) {
      setError("Please fill in both Codeforces and LeetCode usernames.");
      return;
    }

    setLoading(true);
    setError("");
    setStats(null);

    try {
      // Construct the URL with query parameters
      const params = new URLSearchParams({
        leetcode_username: credentials.lcUsername,
        codeforces_handle: credentials.cfHandle,
        force_refresh: 'true', // Force a fresh fetch
      });
      if (credentials.lcCookie) {
        params.append('leetcode_cookie', credentials.lcCookie);
      }
      
      const response = await fetch(`http://127.0.0.1:8000/stats/user?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch stats. Server responded with ${response.status}.`);
      }

      const data = await response.json();
      setStats(data);
    } catch (err: any) {
      console.error("API call failed:", err);
      setError(err.message || "An unexpected error occurred. Please check the console.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  
  // If we have stats, show the Analytics page
  if (stats) {
    // Pass the fetched stats down to the analytics view
    return <AnalyticsView data={stats} />;
  }

  // Otherwise, show the form to get user details
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Link Your Accounts
          </h1>
          <p className="text-gray-400 mt-2">
            Enter your details to generate your personalized dashboard.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-xl space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-300">Codeforces Handle</label>
            <input
              type="text"
              name="cfHandle"
              value={credentials.cfHandle}
              onChange={handleInputChange}
              className="mt-1 w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300">LeetCode Username</label>
            <input
              type="text"
              name="lcUsername"
              value={credentials.lcUsername}
              onChange={handleInputChange}
              className="mt-1 w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300">LeetCode Session Cookie (Optional)</label>
            <input
              type="password"
              name="lcCookie"
              value={credentials.lcCookie}
              onChange={handleInputChange}
              placeholder="For private submission data"
              className="mt-1 w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button type="submit" className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center text-lg transition-transform transform hover:scale-105">
            Generate Dashboard <FaArrowRight className="ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
}
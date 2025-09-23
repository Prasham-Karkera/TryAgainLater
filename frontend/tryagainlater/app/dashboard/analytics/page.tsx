// app/dashboard/analytics/page.tsx
"use client";
import { FaCode, FaChartLine, FaCheckCircle, FaStar } from 'react-icons/fa';

// These remain as placeholder components
const PlaceholderChart = ({ title }: { title: string }) => (
  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
    {title}
  </div>
);
const ActivityHeatmap = () => (
  <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 p-4">
    Activity Heatmap (e.g., using react-calendar-heatmap)
  </div>
);

// Note the component now accepts a 'data' prop
export default function AnalyticsView({ data }: { data: any }) {

  // We now use the 'data' prop directly
  const stats = {
    codeforcesRating: data?.codeforces_data?.rating || "N/A",
    leetcodeSolved: { 
      total: data?.leetcode_data?.stats?.totalSolved || 0,
    },
    submissions: data?.leetcode_data?.stats?.totalSubmissions || 0,
    streak: 0, // You can calculate this or get it from the API
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your CP Profile</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <FaStar className="text-3xl text-yellow-500" />
          <div>
            <p className="text-sm text-gray-500">CF Rating</p>
            <p className="text-2xl font-bold text-gray-900">{stats.codeforcesRating}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <FaCheckCircle className="text-3xl text-green-500" />
          <div>
            <p className="text-sm text-gray-500">LeetCode Solved</p>
            <p className="text-2xl font-bold text-gray-900">{stats.leetcodeSolved.total}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <FaCode className="text-3xl text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Total Submissions</p>
            <p className="text-2xl font-bold text-gray-900">{stats.submissions}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <FaChartLine className="text-3xl text-purple-500" />
          <div>
            <p className="text-sm text-gray-500">Current Streak</p>
            <p className="text-2xl font-bold text-gray-900">{stats.streak} days</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Daily Activity</h2>
        <ActivityHeatmap />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Codeforces Rating History</h2>
          <PlaceholderChart title="Line Chart for Rating" />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">LeetCode Difficulty</h2>
          <PlaceholderChart title="Donut Chart for Difficulty" />
        </div>
      </div>
    </div>
  );
}
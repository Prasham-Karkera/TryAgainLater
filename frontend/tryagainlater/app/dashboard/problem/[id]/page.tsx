// app/dashboard/problem/[id]/page.tsx
"use client";
import { useState } from 'react';
import { FaRobot, FaPen, FaBookOpen } from 'react-icons/fa';

const CodeEditor = ({ code }: { code: string }) => (
  <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm">
    <code>{code}</code>
  </pre>
);

export default function ProblemDetailPage() {
  const [activeTab, setActiveTab] = useState('notes');
  const userCode = `
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}`;

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Two Sum</h1>
        <p className="text-gray-500">LeetCode | Easy | Arrays, Hash Table</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 p-4">
            <button onClick={() => setActiveTab('problem')} className={`px-3 py-2 font-medium text-sm rounded-md ${activeTab === 'problem' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}>
              <FaBookOpen className="inline mr-2"/>Problem
            </button>
            <button onClick={() => setActiveTab('notes')} className={`px-3 py-2 font-medium text-sm rounded-md ${activeTab === 'notes' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}>
              <FaPen className="inline mr-2"/>Your Notes
            </button>
            <button onClick={() => setActiveTab('ai')} className={`px-3 py-2 font-medium text-sm rounded-md ${activeTab === 'ai' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}>
              <FaRobot className="inline mr-2"/>AI Analysis
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'problem' && <div>Problem statement would go here.</div>}
          {activeTab === 'notes' && <div>A rich text editor for your notes would go here.</div>}
          {activeTab === 'ai' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">AI Solution Comparison</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Your Solution</h3>
                  <CodeEditor code={userCode} />
                </div>
                <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-medium mb-2 text-blue-800">Analysis & Suggestions</h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start"><strong className="w-32 flex-shrink-0">Time Complexity:</strong> <span className="font-mono bg-gray-200 px-2 py-0.5 rounded">O(n)</span> - Optimal.</li>
                    <li className="flex items-start"><strong className="w-32 flex-shrink-0">Space Complexity:</strong> <span className="font-mono bg-gray-200 px-2 py-0.5 rounded">O(n)</span> - Optimal for this approach.</li>
                    <li className="flex items-start"><strong className="w-32 flex-shrink-0">Alternative:</strong> A brute-force O(n²) solution exists but is less efficient. Your hash map approach is the standard, optimal solution.</li>
                    <li className="flex items-start"><strong className="w-32 flex-shrink-0">Readability:</strong> Variable names are clear. The logic is straightforward. No issues found.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
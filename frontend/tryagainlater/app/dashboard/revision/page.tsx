// app/dashboard/revision/page.tsx
"use client";
import { useState } from 'react';
import { FaLightbulb, FaCheck, FaTimes, FaStickyNote } from 'react-icons/fa';

export default function RevisionPage() {
  const revisionQueue = [
    { id: 'lc200', title: 'Number of Islands', difficulty: 'Medium', platform: 'LeetCode' },
    { id: 'cf4a', title: 'Watermelon', difficulty: 'Easy', platform: 'Codeforces' },
    { id: 'lc53', title: 'Maximum Subarray', difficulty: 'Easy', platform: 'LeetCode' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProblem = revisionQueue[currentIndex];
  const progress = ((currentIndex + 1) / revisionQueue.length) * 100;

  const handleNext = () => {
    if (currentIndex < revisionQueue.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("Revision session complete!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="mb-4">
          <div className="bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            Problem {currentIndex + 1} of {revisionQueue.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 transition-all duration-300">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className={`text-sm font-bold ${currentProblem.platform === 'LeetCode' ? 'text-yellow-500' : 'text-blue-500'}`}>{currentProblem.platform}</p>
              <h1 className="text-3xl font-bold text-gray-900">{currentProblem.title}</h1>
              <p className="text-md text-gray-500">{currentProblem.difficulty}</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-gray-400 hover:text-yellow-500"><FaLightbulb size={20} /></button>
              <button className="text-gray-400 hover:text-blue-500"><FaStickyNote size={20} /></button>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 min-h-[200px] mb-8">
            <p className="text-gray-600">This area is for your notes, a simplified problem description, or an integrated code editor where you can try to re-solve the problem.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleNext}
              className="flex items-center justify-center py-4 px-6 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-colors"
            >
              <FaTimes className="mr-2" /> Review Again
            </button>
            <button
              onClick={handleNext}
              className="flex items-center justify-center py-4 px-6 bg-green-100 text-green-700 font-semibold rounded-lg hover:bg-green-200 transition-colors"
            >
              <FaCheck className="mr-2" /> Retained
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
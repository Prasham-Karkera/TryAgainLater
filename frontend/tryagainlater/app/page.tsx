"use client";
import { motion } from "framer-motion";
import { FaGithub, FaGoogle, FaArrowRight } from "react-icons/fa";
import Link from "next/link"; // Import the Link component

// A list of sample problem titles for the animated background
const problemTitles = [
  "1. Two Sum", "15. 3Sum", "20. Valid Parentheses", "42. Trapping Rain Water",
  "53. Maximum Subarray", "70. Climbing Stairs", "102. Binary Tree Level Order Traversal",
  "121. Best Time to Buy and Sell Stock", "141. Linked List Cycle", "200. Number of Islands",
  "206. Reverse Linked List", "238. Product of Array Except Self", "322. Coin Change",
  "416. Partition Equal Subset Sum", "A. Theatre Square", "B. Borze", "C. Vasya and Socks",
];

const ScrollingProblem = ({ title }: { title: string }) => (
  <div
    className="bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2 text-gray-400 text-sm whitespace-nowrap"
  >
    {title}
  </div>
);

export default function LandingPage() {
  // State for handles is no longer needed here
  
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between p-8">

        {/* Left Side: Headline & Login Form */}
        <motion.div
          className="w-full lg:w-1/2 lg:pr-16 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Stop Solving.
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Start Retaining.
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-400 max-w-md mx-auto lg:mx-0">
              The spaced repetition platform for competitive programmers. Master the patterns, not just the problems.
            </p>
          </div>

          <div className="mt-10">
            {/* The input fields are removed. The main button is now a Link. */}
            <Link
              href="/dashboard"
              className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center text-lg transition-transform transform hover:scale-105"
            >
              Get Started <FaArrowRight className="ml-2" />
            </Link>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-700"></div>
              <span className="flex-shrink mx-4 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>

            <div className="flex space-x-4">
              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center transition">
                <FaGithub className="mr-2" /> Sign in with GitHub
              </button>
              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center transition">
                <FaGoogle className="mr-2" /> Sign in with Google
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Animated Visual */}
        <div className="hidden lg:block w-1/2 relative h-[500px] overflow-hidden">
          <div className="absolute inset-0 flex flex-col space-y-4 p-4 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
            <div className="animate-scroll flex flex-col space-y-4">
              {[...problemTitles, ...problemTitles].map((title, i) => (
                <ScrollingProblem key={`a-${i}`} title={title} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
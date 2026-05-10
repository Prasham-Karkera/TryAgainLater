// insert-topics.js
require("dotenv").config({ path: ".env.local" });

const { createClient } = require("@supabase/supabase-js");

// ======================
// SUPABASE CONFIG
// ======================
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY;

console.log("Supabase URL:", SUPABASE_URL);
console.log("Supabase Secret Key:", SUPABASE_SECRET_KEY);

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);

// ======================
// TOPICS ARRAY
// ======================
const topics = [
  "Arrays",
  "Strings",
  "Hashing",
  "Sorting",
  "Searching",
  "Binary Search",
  "Two Pointers",
  "Sliding Window",
  "Prefix Sum",
  "Difference Array",
  "Recursion",
  "Backtracking",
  "Greedy",
  "Bit Manipulation",
  "Mathematics",
  "Number Theory",
  "Combinatorics",
  "Probability",
  "Geometry",
  "Matrix",
  "Simulation",
  "Implementation",
  "Brute Force",
  "Divide and Conquer",
  "Dynamic Programming",
  "Memoization",
  "Game Theory",
  "Stack",
  "Monotonic Stack",
  "Queue",
  "Deque",
  "Monotonic Queue",
  "Heap",
  "Priority Queue",
  "Linked List",
  "Doubly Linked List",
  "Circular Linked List",
  "Trie",
  "Hash Table",
  "Set",
  "Ordered Set",
  "Multiset",
  "Map",
  "Ordered Map",
  "Disjoint Set Union",
  "Union Find",
  "Segment Tree",
  "Lazy Propagation",
  "Fenwick Tree",
  "Binary Indexed Tree",
  "Sparse Table",
  "Sqrt Decomposition",
  "Interval Tree",
  "Treap",
  "AVL Tree",
  "Red Black Tree",
  "Binary Tree",
  "Binary Search Tree",
  "Balanced Binary Tree",
  "N-ary Tree",
  "Tree Traversal",
  "DFS",
  "BFS",
  "Euler Tour",
  "Lowest Common Ancestor",
  "Binary Lifting",
  "Heavy Light Decomposition",
  "Centroid Decomposition",
  "Tree DP",
  "Graph",
  "Directed Graph",
  "Undirected Graph",
  "Weighted Graph",
  "DAG",
  "Topological Sort",
  "Shortest Path",
  "Dijkstra Algorithm",
  "Bellman Ford",
  "Floyd Warshall",
  "Minimum Spanning Tree",
  "Kruskal Algorithm",
  "Prim Algorithm",
  "Strongly Connected Components",
  "Bridges",
  "Articulation Points",
  "Bipartite Graph",
  "Network Flow",
  "Max Flow",
  "Min Cut",
  "Matching",
  "Bipartite Matching",
  "Graph Coloring",
  "Hamiltonian Path",
  "Eulerian Path",
  "Cycle Detection",
  "Connectivity",
];

// ======================
// INSERT FUNCTION
// ======================
async function insertTopics() {
  const formattedTopics = topics.map((topic) => ({
    topic_name: topic,
  }));

  const { data, error } = await supabase.from("Topic").insert(formattedTopics);

  if (error) {
    console.error("Error inserting topics:", error);
    return;
  }

  console.log("Topics inserted successfully");
  console.log(data);
}

insertTopics();

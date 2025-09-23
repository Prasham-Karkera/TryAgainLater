type Problem = {
  problem_id: string;
  title: string;
  url: string;
  platform: string;
  tags?: string[];
  difficulty?: "Easy" | "Medium" | "Hard";
  rating?: number;
};

type ProblemCardProps = {
  problem: Problem;
  onAddNote: (problemId: string) => void;
};

export default function ProblemCard({ problem, onAddNote }: ProblemCardProps) {
  const platformConfig = {
    leetcode: {
      icon: "🟢",
      color: "bg-green-100 text-green-800 border-green-200",
    },
    codeforces: {
      icon: "🔵",
      color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    default: {
      icon: "💻",
      color: "bg-gray-100 text-gray-800 border-gray-200",
    },
  };

  const difficultyConfig = {
    Easy: "bg-green-100 text-green-800 border-green-200",
    Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Hard: "bg-red-100 text-red-800 border-red-200",
  };

  const platformKey =
    problem.platform.toLowerCase() as keyof typeof platformConfig;
  const currentPlatform = platformConfig[platformKey] || platformConfig.default;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-in group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{currentPlatform.icon}</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border ${currentPlatform.color}`}
          >
            {problem.platform}
          </span>
        </div>

        {problem.difficulty && (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border ${
              difficultyConfig[problem.difficulty]
            }`}
          >
            {problem.difficulty}
          </span>
        )}
      </div>

      {/* Problem Title */}
      <div className="mb-3">
        <a
          href={problem.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 line-clamp-2 group-hover:text-blue-600"
        >
          {problem.title}
        </a>

        {problem.rating && (
          <div className="flex items-center mt-1 text-sm text-gray-600">
            <span className="text-yellow-500">⭐</span>
            <span className="ml-1">{problem.rating}</span>
          </div>
        )}
      </div>

      {/* Tags */}
      {problem.tags && problem.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {problem.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full border border-gray-200 hover:bg-gray-200 transition-colors"
            >
              {tag}
            </span>
          ))}
          {problem.tags.length > 3 && (
            <span className="px-2 py-1 text-xs text-gray-500 rounded-full">
              +{problem.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-2">
        <a
          href={problem.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-200"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          Solve
        </a>

        <button
          onClick={() => onAddNote(problem.problem_id)}
          className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Note
        </button>
      </div>
    </div>
  );
}

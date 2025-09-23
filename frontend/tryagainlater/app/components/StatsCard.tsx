type StatsCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  color?: "blue" | "green" | "purple" | "orange" | "red";
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon = "📊",
  color = "blue",
  trend,
  trendValue,
}: StatsCardProps) {
  const colorClasses = {
    blue: "from-blue-50 to-blue-100 border-blue-200 text-blue-900",
    green: "from-green-50 to-green-100 border-green-200 text-green-900",
    purple: "from-purple-50 to-purple-100 border-purple-200 text-purple-900",
    orange: "from-orange-50 to-orange-100 border-orange-200 text-orange-900",
    red: "from-red-50 to-red-100 border-red-200 text-red-900",
  };

  const trendClasses = {
    up: "text-green-600 bg-green-100",
    down: "text-red-600 bg-red-100",
    neutral: "text-gray-600 bg-gray-100",
  };

  return (
    <div
      className={`bg-gradient-to-br ${colorClasses[color]} border rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-lg animate-fade-in`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl">{icon}</div>
        {trend && trendValue && (
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${trendClasses[trend]}`}
          >
            {trend === "up" && "↗️"} {trend === "down" && "↘️"}{" "}
            {trend === "neutral" && "→"} {trendValue}
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-medium opacity-80">{title}</h3>
        <p className="text-3xl font-bold leading-none">{value}</p>
        {subtitle && <p className="text-sm opacity-70">{subtitle}</p>}
      </div>
    </div>
  );
}

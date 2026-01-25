// src/components/dashboard/JobTypesChart.jsx

const JobTypesChart = ({ jobsByType, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="h-5 bg-slate-200 rounded w-32 mb-6 animate-pulse" />
        <div className="flex justify-center gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center animate-pulse">
              <div className="w-16 h-16 rounded-full bg-slate-200 mx-auto mb-2" />
              <div className="h-3 bg-slate-200 rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const types = Object.entries(jobsByType);
  const total = types.reduce((sum, [, count]) => sum + count, 0);

  const colors = {
    "Full Time": {
      bg: "bg-green-100",
      text: "text-green-700",
      ring: "ring-green-500",
    },
    "Part Time": {
      bg: "bg-blue-100",
      text: "text-blue-700",
      ring: "ring-blue-500",
    },
    Contract: {
      bg: "bg-purple-100",
      text: "text-purple-700",
      ring: "ring-purple-500",
    },
    Freelance: {
      bg: "bg-amber-100",
      text: "text-amber-700",
      ring: "ring-amber-500",
    },
    Internship: {
      bg: "bg-pink-100",
      text: "text-pink-700",
      ring: "ring-pink-500",
    },
    Workstudent: {
      bg: "bg-cyan-100",
      text: "text-cyan-700",
      ring: "ring-cyan-500",
    },
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-base font-bold text-slate-800 mb-6">Jobs by Type</h3>

      {types.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-4">
          No data available
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {types.map(([type, count]) => {
            const percentage =
              total > 0 ? Math.round((count / total) * 100) : 0;
            const color = colors[type] || {
              bg: "bg-slate-100",
              text: "text-slate-700",
              ring: "ring-slate-500",
            };

            return (
              <div
                key={type}
                className={`p-4 rounded-xl ${color.bg} text-center`}
              >
                <p className={`text-2xl font-bold ${color.text}`}>{count}</p>
                <p className="text-xs font-medium text-slate-600 mt-1">
                  {type}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{percentage}%</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default JobTypesChart;

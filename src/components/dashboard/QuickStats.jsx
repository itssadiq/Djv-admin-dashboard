// src/components/dashboard/QuickStats.jsx

const QuickStats = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl border border-slate-200 animate-pulse"
          >
            <div className="h-3 bg-slate-200 rounded w-20 mb-2" />
            <div className="h-6 bg-slate-200 rounded w-12" />
          </div>
        ))}
      </div>
    );
  }

  const quickStats = [
    {
      label: "Featured",
      value: stats.featuredJobs,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Remote",
      value: stats.remoteJobs,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Full Time",
      value: stats.jobsByType["Full Time"] || 0,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Contract",
      value: stats.jobsByType["Contract"] || 0,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {quickStats.map((stat) => (
        <div
          key={stat.label}
          className={`${stat.bg} p-4 rounded-xl border border-slate-100`}
        >
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {stat.label}
          </span>
          <p className={`text-2xl font-bold ${stat.color} mt-1`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;

// src/components/dashboard/TopIndustries.jsx

const TopIndustries = ({ industries, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="h-5 bg-slate-200 rounded w-32 mb-6 animate-pulse" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex justify-between mb-2">
                <div className="h-3 bg-slate-200 rounded w-24" />
                <div className="h-3 bg-slate-200 rounded w-8" />
              </div>
              <div className="h-2 bg-slate-200 rounded w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Calculate max for percentage
  const maxCount = industries.length > 0 ? industries[0][1] : 1;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-base font-bold text-slate-800 mb-6">
        Top Industries
      </h3>

      {industries.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-4">
          No data available
        </p>
      ) : (
        <div className="space-y-4">
          {industries.map(([industry, count], index) => {
            const percentage = (count / maxCount) * 100;
            const colors = [
              "bg-brand-green",
              "bg-blue-500",
              "bg-purple-500",
              "bg-amber-500",
              "bg-pink-500",
            ];

            return (
              <div key={industry}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">{industry}</span>
                  <span className="text-slate-500">{count} jobs</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${colors[index]} rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TopIndustries;

// src/components/dashboard/TopCompanies.jsx

const TopCompanies = ({ companies, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="h-5 bg-slate-200 rounded w-32 mb-6 animate-pulse" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-lg bg-slate-200" />
              <div className="flex-1 h-4 bg-slate-200 rounded" />
              <div className="w-8 h-4 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-base font-bold text-slate-800 mb-6">Top Companies</h3>

      {companies.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-4">
          No data available
        </p>
      ) : (
        <div className="space-y-3">
          {companies.map(([company, count], index) => (
            <div
              key={company}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">
                {company.charAt(0).toUpperCase()}
              </div>
              <span className="flex-1 text-sm font-medium text-slate-700 truncate">
                {company}
              </span>
              <span className="text-sm text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {count}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopCompanies;

import React from "react";
import { TrendingUp } from "lucide-react";

const TopIndustries = ({ industries, title = "Top Industries", isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full flex flex-col justify-between">
        <div className="h-5 bg-slate-100 rounded w-32 mb-6 animate-pulse" />
        <div className="space-y-5 flex-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse space-y-2">
              <div className="flex justify-between">
                <div className="h-3 bg-slate-100 rounded w-24" />
                <div className="h-3 bg-slate-100 rounded w-8" />
              </div>
              <div className="h-2 bg-slate-50 rounded w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const maxCount = industries.length > 0 ? industries[0][1] : 1;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
        <TrendingUp size={18} className="text-brand-green" />
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
      </div>

      {industries.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-slate-400 text-sm italic">No data yet</div>
      ) : (
        <div className="space-y-5 flex-1">
          {industries.map(([industry, count], index) => {
            const percentage = (count / maxCount) * 100;
            const colors = ["bg-brand-green", "bg-blue-500", "bg-purple-500", "bg-amber-500", "bg-pink-500"];
            
            return (
              <div key={industry}>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span className="truncate pr-2">{industry}</span>
                  <span className="shrink-0 text-slate-500 font-medium">{count} jobs</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${colors[index % colors.length]} rounded-full transition-all duration-700 ease-out`}
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
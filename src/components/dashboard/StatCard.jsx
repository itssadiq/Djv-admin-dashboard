import React from "react";

const StatCard = ({ title, value, icon: Icon, iconColor, gradientColor, sub, loading }) => {
  if (loading) {
    // ... skeleton loader (same as before) ...
    return <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-32 animate-pulse" />
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
      
      {/* Decorative Gradient */}
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent ${gradientColor} rounded-bl-full transition-opacity duration-500`}></div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        {/* Icon Box */}
        <div className={`p-2.5 rounded-xl bg-slate-50 ${iconColor} group-hover:bg-white group-hover:shadow-sm transition-all duration-300`}>
          <Icon size={20} />
        </div>
        {sub && <span className="text-[10px] font-semibold bg-slate-50 text-slate-500 px-2 py-1 rounded-full">{sub}</span>}
      </div>
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;
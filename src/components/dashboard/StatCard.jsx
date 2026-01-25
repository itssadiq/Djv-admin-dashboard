// src/components/dashboard/StatCard.jsx

const StatCard = ({
  title,
  value,
  icon,
  highlight = false,
  subtitle,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-32 animate-pulse">
        <div className="h-3 bg-slate-200 rounded w-24 mb-4" />
        <div className="h-8 bg-slate-200 rounded w-16" />
      </div>
    );
  }

  return (
    <div
      className={`bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32 ${
        highlight ? "border-b-4 border-b-brand-green" : ""
      }`}
    >
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
        {title}
      </span>
      <div className="flex items-end justify-between">
        <span
          className={`text-3xl font-bold ${
            highlight ? "text-brand-green" : "text-slate-800"
          }`}
        >
          {value}
        </span>
        {icon && icon}
        {subtitle && (
          <span className="text-xs text-slate-500 font-medium">{subtitle}</span>
        )}
      </div>
    </div>
  );
};

export default StatCard;

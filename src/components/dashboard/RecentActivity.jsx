import React from "react";
import { User, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecentActivity = ({ applications }) => {
  const navigate = useNavigate();
  
  // Show max 10 to fill the tall sidebar, but scroll if more
  const displayApps = applications?.slice(0, 10) || [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      
      {/* Header (Fixed Height) */}
      <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30 shrink-0">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <Clock size={18} className="text-brand-green" /> Recent Activity
        </h3>
        <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-md shadow-sm">
          Last {displayApps.length}
        </span>
      </div>

      {/* List Content (Scrollable Area) */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
        {displayApps.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-12">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                <Clock className="text-slate-300" size={24} />
            </div>
            <p className="text-sm text-slate-400 font-medium">No recent activity found.</p>
          </div>
        ) : (
          displayApps.map((app, i) => (
            <div key={i} className="flex gap-4 relative group">
              
              {/* Timeline Line */}
              {i !== displayApps.length - 1 && (
                <div className="absolute left-[15px] top-10 bottom-[-24px] w-px bg-slate-100 group-hover:bg-brand-green/30 transition-colors"></div>
              )}

              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 z-10 overflow-hidden shadow-sm group-hover:border-brand-green/50 transition-colors">
                {app.profiles?.avatar_url ? (
                  <img
                    src={app.profiles.avatar_url}
                    className="w-full h-full object-cover"
                    alt="User"
                  />
                ) : (
                  <User size={14} className="text-slate-400" />
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-sm text-slate-600 truncate leading-snug">
                  <span className="font-bold text-slate-900 block truncate group-hover:text-brand-green transition-colors">
                    {app.profiles?.first_name} {app.profiles?.last_name}
                  </span>
                  <span className="text-xs">applied for </span>
                  <span className="font-semibold text-slate-800">{app.jobs?.title}</span>
                </p>
                <p className="text-[10px] text-slate-400 mt-1.5 font-medium flex items-center gap-1">
                  {new Date(app.created_at).toLocaleDateString()} 
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  {new Date(app.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Action (Fixed Height) */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0">
        <button 
            onClick={() => navigate("/dashboard/applications")}
            className="w-full flex items-center justify-center gap-2 pl-4 pr-3 py-2 bg-brand-dark text-white rounded-lg shadow-md hover:bg-slate-800 hover:shadow-lg transition-all active:translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
            View All Applications <ArrowRight size={14} />
        </button>
      </div>

    </div>
  );
};

export default RecentActivity;
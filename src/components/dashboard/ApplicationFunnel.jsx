import React from "react";
import { Users, UserCheck, CheckCircle2, Clock, XCircle, PieChart } from "lucide-react";

const FunnelItem = ({ label, count, total, color, icon: Icon }) => {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div className="group">
      <div className="flex justify-between items-center text-xs mb-2">
        <div className="flex items-center gap-2.5">
          <div className={`p-1.5 rounded-lg transition-colors ${color.bg} ${color.text} group-hover:scale-105`}>
            <Icon size={14} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-slate-700">{label}</span>
        </div>
        
        <div className="text-right flex items-center gap-2">
          <span className="font-black text-slate-900">{count}</span>
          <span className="text-[10px] text-slate-400 font-semibold bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
            {percentage}%
          </span>
        </div>
      </div>
      
      <div className="w-full bg-slate-50 rounded-full h-1.5 overflow-hidden flex items-center">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${color.bar}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const ApplicationFunnel = ({ stats }) => {
  const pending = stats?.pending || 0;
  const interview = stats?.interview || 0;
  const hired = stats?.hired || 0;
  const rejected = stats?.rejected || 0;
  const total = pending + interview + hired + rejected;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full flex flex-col">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b border-slate-50 pb-4">
        <div className="flex items-center gap-2">
            <PieChart size={18} className="text-purple-500" />
            <h3 className="font-bold text-slate-900 text-base">Hiring Pipeline</h3>
        </div>
        <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide border border-slate-200">
          Total: {total}
        </span>
      </div>

      {/* List */}
      <div className="space-y-5 flex-1">
        <FunnelItem label="Pending" count={pending} total={total} icon={Clock} color={{ bg: "bg-yellow-50", text: "text-yellow-600", bar: "bg-yellow-400" }} />
        <FunnelItem label="Interview" count={interview} total={total} icon={Users} color={{ bg: "bg-purple-50", text: "text-purple-600", bar: "bg-purple-500" }} />
        <FunnelItem label="Hired" count={hired} total={total} icon={CheckCircle2} color={{ bg: "bg-green-50", text: "text-green-600", bar: "bg-brand-green" }} />
        <FunnelItem label="Rejected" count={rejected} total={total} icon={XCircle} color={{ bg: "bg-red-50", text: "text-red-600", bar: "bg-red-400" }} />
      </div>
    </div>
  );
};

export default ApplicationFunnel;
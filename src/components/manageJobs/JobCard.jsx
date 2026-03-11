import React from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, Eye, MapPin, Briefcase } from "lucide-react";
const JobCard = ({ job, isSelected, onSelectRow, onDelete }) => {
  const isActive = job.status === "active";

  

  return (
    <div
      className={`relative border rounded-xl p-5 transition-all duration-200 ${
        isSelected
          ? "bg-green-50 border-green-200 ring-1 ring-green-200"
          : "bg-white border-slate-200 hover:shadow-md"
      }`}
    >
      {/* 1. Header: Checkbox & Status */}
      <div className="flex justify-between items-start mb-4">
        <input
          type="checkbox"
          className="w-5 h-5 rounded border-slate-300 text-brand-green focus:ring-brand-green cursor-pointer"
          checked={isSelected}
          onChange={() => onSelectRow(job.id)}
        />
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
            isActive
              ? "bg-green-100 text-green-700 border-green-200"
              : "bg-slate-100 text-slate-500 border-slate-200"
          }`}
        >
          {job.status}
        </span>
      </div>

      {/* 2. Job Info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-white border border-slate-100 flex items-center justify-center p-1 shrink-0">
          <img
            src={job.company_logo}
            alt={job.company_name}
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h4 className="text-base font-bold text-slate-900 line-clamp-1">
            {job.title}
          </h4>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            {job.company_name}
          </p>
        </div>
      </div>

      {/* 3. Details */}
      <div className="space-y-2 mb-5">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Briefcase size={14} className="text-slate-400" />
          {job.job_type.replace("_", " ")}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <MapPin size={14} className="text-slate-400" />
          {job.location}
        </div>
        <div className="text-xs text-slate-400 pl-6">
          Posted: {new Date(job.created_at).toLocaleDateString()}
        </div>
      </div>

      {/* 4. Actions */}
      <div className="flex gap-2 border-t border-slate-100 pt-4">
        <Link
          to={`/admin/jobs/edit/${job.id}`}
          className="flex-1 py-2 flex items-center justify-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
        >
          <Edit size={14} /> Edit
        </Link>
        <button
          onClick={() => onDelete(job.id, job.title)}
          className="flex-1 py-2 flex items-center justify-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <Trash2 size={14} /> Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
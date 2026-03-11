import React from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, Eye, MapPin, Briefcase } from "lucide-react";
import JobCard from "./JobCard";
import { useNavigate } from "react-router-dom";

const JobsList = ({
  jobs,
  isLoading,
  onDelete,
  selectedIds,
  onSelectAll,
  onSelectRow,
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 w-32 bg-slate-200 rounded mb-4"></div>
          <div className="h-3 w-48 bg-slate-100 rounded"></div>
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
        <p className="text-slate-500">No jobs found matching your filters.</p>
      </div>
    );
  }  const navigate = useNavigate();
  
const handleEdit = () => {
    navigate(`/dashboard/edit-job/${job.id}`);
  };

  // Check if all visible jobs are selected
  const allSelected = jobs.length > 0 && jobs.every((job) => selectedIds.includes(job.id));

  return (
    <>
      {/* ─── MOBILE VIEW (Cards) ─── */}
      <div className="block md:hidden space-y-4">
        <div className="flex items-center gap-2 mb-2 px-1">
          <input
            type="checkbox"
            className="w-5 h-5 rounded border-slate-300 text-brand-green focus:ring-brand-green"
            checked={allSelected}
            onChange={onSelectAll}
          />
          <span className="text-sm font-bold text-slate-600">Select All</span>
        </div>
        
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSelected={selectedIds.includes(job.id)}
            onSelectRow={onSelectRow}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* ─── DESKTOP VIEW (Table) ─── */}
      <div className="hidden md:block bg-white  rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse h-1/2">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-brand-green focus:ring-brand-green cursor-pointer"
                    checked={allSelected}
                    onChange={onSelectAll}
                  />
                </th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Company / Role
                </th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Type
                </th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Date
                </th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Status
                </th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wide text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobs.map((job) => {
                const isSelected = selectedIds.includes(job.id);
                return (
                  <tr
                    key={job.id}
                    className={`transition-colors ${
                      isSelected ? "bg-green-50/30" : "hover:bg-slate-50/50"
                    }`}
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-brand-green focus:ring-brand-green cursor-pointer"
                        checked={isSelected}
                        onChange={() => onSelectRow(job.id)}
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center p-1 shrink-0">
                          <img
                            src={job.company_logo}
                            alt="logo"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm line-clamp-1">
                            {job.title}
                          </p>
                          <p className="text-xs text-slate-500 line-clamp-1">
                            {job.company_name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium text-slate-700 flex items-center gap-1">
                          <Briefcase size={12} />{" "}
                          {job.job_type.replace("_", " ")}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin size={12} /> {job.location}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-xs text-slate-500 font-medium">
                      {new Date(job.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border
                        ${
                          job.status === "active"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-1">
                      

                        <Link
                       
                          to={`/dashboard/edit-job/${job.id}`}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Job"
                        >
                          <Edit size={16} />
                        </Link>

                        <button
                          onClick={() => onDelete(job.id, job.title)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Job"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default JobsList;
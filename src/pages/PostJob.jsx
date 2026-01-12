import React from "react";

const PostJob = () => {
  const inputClass =
    "w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-800 transition-all shadow-sm focus:border-brand-green focus:ring-4 focus:ring-green-500/15 focus:outline-none";
  const selectClass =
    "w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-800 transition-all shadow-sm focus:border-brand-green focus:ring-4 focus:ring-green-500/15 focus:outline-none appearance-none bg-select-arrow bg-[length:1.5em_1.5em] bg-no-repeat bg-[right_0.75rem_center] cursor-pointer";

  return (
    <section className="animate-fade-in max-w-5xl mx-auto">
      <form className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-800">The Basics</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                Job Title
              </label>
              <input
                type="text"
                className={inputClass}
                placeholder="e.g. Senior Product Designer"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                Company Name
              </label>
              <input
                type="text"
                className={inputClass}
                placeholder="e.g. Dejob Inc."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                Industry
              </label>
              <select className={selectClass}>
                <option>Select Industry...</option>
                <option>Technology</option>
                <option>Finance</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              Details & Logistics
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                Employment Type
              </label>
              <select className={selectClass}>
                <option>Full-time</option>
                <option>Contract</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                Location
              </label>
              <input
                type="text"
                className={inputClass}
                placeholder="e.g. Berlin, Germany"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                Salary Range
              </label>
              <input
                type="text"
                className={inputClass}
                placeholder="e.g. $80k - $120k"
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                Job Description
              </label>
              <textarea
                rows="8"
                className={`${inputClass} resize-y`}
                placeholder="Describe the role responsibilities..."
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            className="px-8 py-3 rounded-lg text-sm font-semibold text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition"
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="px-8 py-3 rounded-lg text-sm font-semibold text-white bg-brand-green hover:bg-brand-hover shadow-lg shadow-green-500/20 transition transform hover:-translate-y-0.5"
          >
            Publish Listing
          </button>
        </div>
      </form>
    </section>
  );
};

export default PostJob;

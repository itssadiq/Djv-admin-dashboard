// src/components/jobs/FormSkeleton.jsx

const FormSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto pb-8 space-y-6 animate-pulse">
      {/* Section 1 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-8 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-200" />
            <div>
              <div className="h-4 bg-slate-200 rounded w-32 mb-2" />
              <div className="h-3 bg-slate-200 rounded w-48" />
            </div>
          </div>
        </div>
        <div className="p-8 space-y-6">
          <div className="h-12 bg-slate-100 rounded-xl" />
          <div className="grid grid-cols-2 gap-6">
            <div className="h-12 bg-slate-100 rounded-xl" />
            <div className="h-12 bg-slate-100 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-8 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-200" />
            <div>
              <div className="h-4 bg-slate-200 rounded w-24 mb-2" />
              <div className="h-3 bg-slate-200 rounded w-40" />
            </div>
          </div>
        </div>
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="h-12 bg-slate-100 rounded-xl" />
            <div className="h-12 bg-slate-100 rounded-xl" />
          </div>
          <div className="h-40 bg-slate-100 rounded-xl" />
        </div>
      </div>

      {/* Section 3 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-8 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-200" />
            <div>
              <div className="h-4 bg-slate-200 rounded w-36 mb-2" />
              <div className="h-3 bg-slate-200 rounded w-44" />
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="h-12 bg-slate-100 rounded-xl" />
            <div className="h-12 bg-slate-100 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSkeleton;

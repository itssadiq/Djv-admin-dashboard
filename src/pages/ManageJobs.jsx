import { useManageJobs } from "../hooks/useManageJobs";
import {
  JobFilters,
  JobsList,
  DeleteModal,
  Pagination,
} from "../components/manageJobs";

import { Trash2, X } from "lucide-react";

const ManageJobs = () => {
  const {
    jobs,
    totalJobs,
    isLoading,
    isError,
    error,
    isDeleting,
    currentPage,
    totalPages,
    handlePageChange,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filterOptions,
    clearFilters,
    // New Props from Hook
    selectedIds,
    handleSelectAll,
    handleSelectRow,
    openBulkDeleteModal,
    // Modal
    deleteModal,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  } = useManageJobs();

  if (isError) return <div className="p-8 text-red-500">Error: {error?.message}</div>;

  return (
    <section className="animate-fade-in space-y-6 relative min-h-screen pb-20">
      
      {/* 1. Header & Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
            <h1 className="text-2xl font-black text-slate-900">Manage Jobs</h1>
            <p className="text-sm text-slate-500">
                Total: <span className="font-bold text-slate-900">{totalJobs}</span>
            </p>
        </div>
        
        <JobFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filters={filters}
            setFilters={setFilters}
            filterOptions={filterOptions}
            clearFilters={clearFilters}
        />
      </div>

      {/* 2. Jobs List Table (Updated with Checkboxes) */}
      <JobsList 
        jobs={jobs} 
        isLoading={isLoading} 
        onDelete={openDeleteModal} 
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onSelectRow={handleSelectRow}
      />

      {/* 3. Pagination */}
      {!isLoading && totalJobs > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* 4. Floating Bulk Action Bar (Shows when items selected) */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 z-50 animate-in slide-in-from-bottom-4">
            <div className="flex items-center gap-2">
                <div className="bg-brand-green text-slate-900 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {selectedIds.length}
                </div>
                <span className="font-medium text-sm">Selected</span>
            </div>
            
            <div className="h-4 w-px bg-white/20"></div>

            <button 
                onClick={openBulkDeleteModal}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 font-bold text-sm transition-colors"
            >
                <Trash2 size={16} /> Delete Selection
            </button>
        </div>
      )}

      {/* 5. Delete Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        title={deleteModal.title}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        isBulk={deleteModal.type === 'bulk'}
      />
    </section>
  );
};

export default ManageJobs;
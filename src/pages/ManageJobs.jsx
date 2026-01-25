// src/pages/ManageJobs.jsx

import { useManageJobs } from "../hooks/useManageJobs";
import {
  JobFilters,
  JobsList,
  DeleteModal,
  ErrorState,
  Pagination,
} from "../components/manageJobs";

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
    companyFilter,
    setCompanyFilter,
    industryFilter,
    setIndustryFilter,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    filterOptions,
    clearFilters,
    deleteModal,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  } = useManageJobs();

  if (isError) {
    return (
      <section className="animate-fade-in">
        <ErrorState message={error?.message} />
      </section>
    );
  }

  return (
    <section className="animate-fade-in space-y-6">
      {/* Filters */}
      <JobFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        companyFilter={companyFilter}
        setCompanyFilter={setCompanyFilter}
        industryFilter={industryFilter}
        setIndustryFilter={setIndustryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        filterOptions={filterOptions}
        clearFilters={clearFilters}
      />

      {/* Jobs Count */}
      {!isLoading && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">{jobs.length}</span>{" "}
            of <span className="font-semibold text-slate-700">{totalJobs}</span>{" "}
            job{totalJobs !== 1 ? "s" : ""}
          </p>
        </div>
      )}

      {/* Jobs List */}
      <JobsList jobs={jobs} isLoading={isLoading} onDelete={openDeleteModal} />

      {/* Pagination */}
      {!isLoading && totalJobs > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        jobTitle={deleteModal.jobTitle}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />
    </section>
  );
};

export default ManageJobs;

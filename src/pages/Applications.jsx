// src/pages/Applications.jsx

import { useManageApplications } from "../hooks/useManageApplications";
import {
  ApplicationFilters,
  ApplicationList,
  Pagination,
} from "../components/applications";

const Applications = () => {
  const {
    applications,
    totalApplications,
    isLoading,
    isError,
    error,
    searchQuery,
    setSearchQuery,
    jobFilter,
    setJobFilter,
    statusFilter,
    setStatusFilter,
    industryFilter, // New prop
    setIndustryFilter, // New prop
    filterOptions, // Updated prop (contains jobs & industries)
    clearFilters,
    currentPage,
    totalPages,
    handlePageChange,
  } = useManageApplications();

  if (isError) {
    return (
      <section className="animate-fade-in">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          {/* Error SVG */}
          <h3 className="text-lg font-semibold text-red-800 mb-1">
            Failed to load applications
          </h3>
          <p className="text-sm text-red-600">
            {error?.message || "Something went wrong. Please try again."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="animate-fade-in space-y-6">
      {/* Filters */}
      <ApplicationFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        jobFilter={jobFilter}
        setJobFilter={setJobFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        industryFilter={industryFilter} // Pass new prop
        setIndustryFilter={setIndustryFilter} // Pass new prop
        filterOptions={filterOptions} // Pass combined options
        clearFilters={clearFilters}
      />

      {/* Count */}
      {!isLoading && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {applications.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {totalApplications}
            </span>{" "}
            application{totalApplications !== 1 ? "s" : ""}
          </p>
        </div>
      )}

      {/* List */}
      <ApplicationList applications={applications} isLoading={isLoading} />

      {/* Pagination */}
      {!isLoading && totalApplications > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
};

export default Applications;

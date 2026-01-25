// src/hooks/useManageJobs.js

import { useState, useMemo, useCallback } from "react";
import { useGetJobsQuery, useDeleteJobMutation } from "../services/jobsApi";

const JOBS_PER_PAGE = 10;

export const useManageJobs = () => {
  const { data: jobs = [], isLoading, isError, error } = useGetJobsQuery();
  const [deleteJob, { isLoading: isDeleting }] = useDeleteJobMutation();

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Delete confirmation state
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    jobId: null,
    jobTitle: "",
  });

  // Get unique values for filter dropdowns
  const filterOptions = useMemo(() => {
    const companies = [...new Set(jobs.map((job) => job.company_name))].sort();
    const industries = [...new Set(jobs.map((job) => job.industry))].sort();
    const statuses = [...new Set(jobs.map((job) => job.status))].sort();
    const types = [...new Set(jobs.map((job) => job.job_type))].sort();

    return { companies, industries, statuses, types };
  }, [jobs]);

  // Filter jobs based on all criteria
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCompany =
        companyFilter === "" || job.company_name === companyFilter;

      const matchesIndustry =
        industryFilter === "" || job.industry === industryFilter;

      const matchesStatus = statusFilter === "" || job.status === statusFilter;

      const matchesType = typeFilter === "" || job.job_type === typeFilter;

      return (
        matchesSearch &&
        matchesCompany &&
        matchesIndustry &&
        matchesStatus &&
        matchesType
      );
    });
  }, [
    jobs,
    searchQuery,
    companyFilter,
    industryFilter,
    statusFilter,
    typeFilter,
  ]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);

  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
    const endIndex = startIndex + JOBS_PER_PAGE;
    return filteredJobs.slice(startIndex, endIndex);
  }, [filteredJobs, currentPage]);

  // Reset to page 1 when filters change
  const handleFilterChange = useCallback(
    (setter) => (value) => {
      setter(value);
      setCurrentPage(1);
    },
    [],
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setCompanyFilter("");
    setIndustryFilter("");
    setStatusFilter("");
    setTypeFilter("");
    setCurrentPage(1);
  }, []);

  // Page change handler
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Open delete confirmation modal
  const openDeleteModal = useCallback((jobId, jobTitle) => {
    setDeleteModal({ isOpen: true, jobId, jobTitle });
  }, []);

  // Close delete confirmation modal
  const closeDeleteModal = useCallback(() => {
    setDeleteModal({ isOpen: false, jobId: null, jobTitle: "" });
  }, []);

  // Confirm delete
  const confirmDelete = useCallback(async () => {
    if (deleteModal.jobId) {
      try {
        await deleteJob(deleteModal.jobId).unwrap();
        closeDeleteModal();

        // Adjust current page if needed
        const newTotalPages = Math.ceil(
          (filteredJobs.length - 1) / JOBS_PER_PAGE,
        );
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
      } catch (err) {
        console.error("Failed to delete job:", err);
      }
    }
  }, [
    deleteModal.jobId,
    deleteJob,
    closeDeleteModal,
    filteredJobs.length,
    currentPage,
  ]);

  return {
    // Data
    jobs: paginatedJobs,
    totalJobs: filteredJobs.length,
    isLoading,
    isError,
    error,
    isDeleting,

    // Pagination
    currentPage,
    totalPages,
    handlePageChange,

    // Filter states
    searchQuery,
    setSearchQuery: handleFilterChange(setSearchQuery),
    companyFilter,
    setCompanyFilter: handleFilterChange(setCompanyFilter),
    industryFilter,
    setIndustryFilter: handleFilterChange(setIndustryFilter),
    statusFilter,
    setStatusFilter: handleFilterChange(setStatusFilter),
    typeFilter,
    setTypeFilter: handleFilterChange(setTypeFilter),

    // Filter options
    filterOptions,
    clearFilters,

    // Delete modal
    deleteModal,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  };
};

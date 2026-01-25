import { useState, useMemo, useCallback } from "react";
import { useGetJobsQuery, useDeleteJobMutation } from "../services/jobsApi";

export const useManageJobs = () => {
  const { data: jobs = [], isLoading, isError, error } = useGetJobsQuery();
  const [deleteJob, { isLoading: isDeleting }] = useDeleteJobMutation();

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

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

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setCompanyFilter("");
    setIndustryFilter("");
    setStatusFilter("");
    setTypeFilter("");
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
      } catch (err) {
        console.error("Failed to delete job:", err);
      }
    }
  }, [deleteModal.jobId, deleteJob, closeDeleteModal]);

  return {
    // Data
    jobs: filteredJobs,
    isLoading,
    isError,
    error,
    isDeleting,

    // Filter states
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

// src/hooks/useManageApplications.js

import { useState, useMemo, useCallback } from "react";
import { useGetApplicationsQuery } from "../services/applicationsApi";

const ITEMS_PER_PAGE = 10;

export const useManageApplications = () => {
  const {
    data: applications = [],
    isLoading,
    isError,
    error,
  } = useGetApplicationsQuery();

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [jobFilter, setJobFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState(""); // New Filter

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique filter options
  const filterOptions = useMemo(() => {
    // Unique jobs
    const jobs = applications.map((app) => ({
      id: app.jobs?.id,
      title: app.jobs?.title,
      company: app.jobs?.company_name,
    }));

    const uniqueJobs = jobs.filter(
      (job, index, self) =>
        job.id && self.findIndex((j) => j.id === job.id) === index,
    );

    // Unique industries (NEW)
    const industries = [
      ...new Set(
        applications
          .map((app) => app.jobs?.industry)
          .filter((industry) => industry), // Remove null/undefined
      ),
    ].sort();

    return { jobs: uniqueJobs, industries };
  }, [applications]);

  // Filter applications
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const fullName =
        `${app.profiles?.first_name || ""} ${app.profiles?.last_name || ""}`.toLowerCase();
      const email = app.profiles?.email?.toLowerCase() || "";

      const matchesSearch =
        searchQuery === "" ||
        fullName.includes(searchQuery.toLowerCase()) ||
        email.includes(searchQuery.toLowerCase());

      const matchesJob = jobFilter === "" || app.job_id === jobFilter;

      const matchesStatus = statusFilter === "" || app.status === statusFilter;

      // New Industry Filter Logic
      const matchesIndustry =
        industryFilter === "" || app.jobs?.industry === industryFilter;

      return matchesSearch && matchesJob && matchesStatus && matchesIndustry;
    });
  }, [applications, searchQuery, jobFilter, statusFilter, industryFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);

  const paginatedApplications = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredApplications.slice(start, end);
  }, [filteredApplications, currentPage]);

  // Reset page on filter change
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
    setJobFilter("");
    setStatusFilter("");
    setIndustryFilter(""); // Clear industry
    setCurrentPage(1);
  }, []);

  // Handle page change
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return {
    applications: paginatedApplications,
    totalApplications: filteredApplications.length,
    isLoading,
    isError,
    error,

    // Filters
    searchQuery,
    setSearchQuery: handleFilterChange(setSearchQuery),
    jobFilter,
    setJobFilter: handleFilterChange(setJobFilter),
    statusFilter,
    setStatusFilter: handleFilterChange(setStatusFilter),
    industryFilter,
    setIndustryFilter: handleFilterChange(setIndustryFilter), // Export new setter

    // Options
    filterOptions, // Export combined options
    clearFilters,

    // Pagination
    currentPage,
    totalPages,
    handlePageChange,
  };
};

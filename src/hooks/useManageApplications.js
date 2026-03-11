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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique jobs for filter dropdown
  const jobOptions = useMemo(() => {
    const jobs = applications.map((app) => ({
      id: app.jobs?.id,
      title: app.jobs?.title,
      company: app.jobs?.company_name,
    }));

    const uniqueJobs = jobs.filter(
      (job, index, self) =>
        job.id && self.findIndex((j) => j.id === job.id) === index,
    );

    return uniqueJobs;
  }, [applications]);

  // Filter applications
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const fullName =
        `${app.profiles?.first_name || ""} ${app.profiles?.last_name || ""}`.toLowerCase();

      const matchesSearch =
        searchQuery === "" || fullName.includes(searchQuery.toLowerCase());

      const matchesJob = jobFilter === "" || app.job_id === jobFilter;

      const matchesStatus = statusFilter === "" || app.status === statusFilter;

      return matchesSearch && matchesJob && matchesStatus;
    });
  }, [applications, searchQuery, jobFilter, statusFilter]);

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

  // Clear filters
  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setJobFilter("");
    setStatusFilter("");
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
    searchQuery,
    setSearchQuery: handleFilterChange(setSearchQuery),
    jobFilter,
    setJobFilter: handleFilterChange(setJobFilter),
    statusFilter,
    setStatusFilter: handleFilterChange(setStatusFilter),
    jobOptions,
    clearFilters,
    currentPage,
    totalPages,
    handlePageChange,
  };
};

// src/hooks/useDashboardStats.js

import { useMemo } from "react";
import { useGetJobsQuery } from "../services/jobsApi";

export const useDashboardStats = () => {
  const { data: jobs = [], isLoading, isError, error } = useGetJobsQuery();

  const stats = useMemo(() => {
    const totalJobs = jobs.length;
    const activeJobs = jobs.filter((job) => job.status === "active").length;
    const closedJobs = jobs.filter((job) => job.status === "closed").length;

    // Calculate total applicants (if you have applicants_count field)
    const totalApplicants = jobs.reduce(
      (sum, job) => sum + (job.applicants_count || 0),
      0,
    );

    // Get jobs by type
    const jobsByType = jobs.reduce((acc, job) => {
      acc[job.job_type] = (acc[job.job_type] || 0) + 1;
      return acc;
    }, {});

    // Get jobs by experience level
    const jobsByExperience = jobs.reduce((acc, job) => {
      acc[job.experience_level] = (acc[job.experience_level] || 0) + 1;
      return acc;
    }, {});

    // Get recent jobs (last 5)
    const recentJobs = [...jobs]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5);

    // Get featured jobs count
    const featuredJobs = jobs.filter((job) => job.is_featured).length;

    // Get remote jobs count
    const remoteJobs = jobs.filter((job) => job.is_remote).length;

    // Get jobs by industry (top 5)
    const jobsByIndustry = jobs.reduce((acc, job) => {
      acc[job.industry] = (acc[job.industry] || 0) + 1;
      return acc;
    }, {});

    const topIndustries = Object.entries(jobsByIndustry)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Get jobs by company (top 5)
    const jobsByCompany = jobs.reduce((acc, job) => {
      acc[job.company_name] = (acc[job.company_name] || 0) + 1;
      return acc;
    }, {});

    const topCompanies = Object.entries(jobsByCompany)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      totalJobs,
      activeJobs,
      closedJobs,
      totalApplicants,
      jobsByType,
      jobsByExperience,
      recentJobs,
      featuredJobs,
      remoteJobs,
      topIndustries,
      topCompanies,
    };
  }, [jobs]);

  return {
    stats,
    isLoading,
    isError,
    error,
  };
};

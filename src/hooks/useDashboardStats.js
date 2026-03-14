// src/hooks/useDashboardStats.js

import { useState, useEffect } from "react";
import { supabase } from "../lib/config"; // Ensure this path is correct

export const useDashboardStats = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    closedJobs: 0,
    totalApplicants: 0,
    recentJobs: [],
    recentApplications: [],
    topIndustries: [],
    topCompanies: [],
    topLocations: [],
    jobsByType: {},
    applicationStats: {}, // 🟢 NEW: For Funnel
    topSkills: [],        // 🟢 NEW: For Skills Cloud
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        // 1. Fetch ALL Jobs (for stats)
        const { data: jobs, error: jobsError } = await supabase
          .from("jobs")
          .select("*")
          .order("created_at", { ascending: false });

        if (jobsError) throw jobsError;

        // 2. Fetch RECENT Applications (For Activity Feed)
        const { data: recentApps, error: recentAppsError } = await supabase
          .from("applications")
          .select(
            "created_at, status, profiles(first_name, last_name, avatar_url), jobs(title)"
          )
          .order("created_at", { ascending: false })
          .limit(4);

        if (recentAppsError) throw recentAppsError;

        // 3. Fetch ALL Application Statuses (For Funnel Stats)
        // We do a separate lightweight query just for counting statuses
        const { data: allAppStatuses, error: statusError } = await supabase
            .from("applications")
            .select("status");
            
        if (statusError) throw statusError;

        // --- CALCULATIONS ---

        // A. Funnel Stats
        const statusCounts = { pending: 0, reviewed: 0, interview: 0, hired: 0, rejected: 0 };
        allAppStatuses.forEach((app) => {
            const s = app.status || 'pending';
            statusCounts[s] = (statusCounts[s] || 0) + 1;
        });

        // B. Top Skills Analysis
        const skillMap = {};
        jobs.forEach((job) => {
            if (job.status === 'active' && job.skills) {
                job.skills.forEach(skill => {
                    skillMap[skill] = (skillMap[skill] || 0) + 1;
                });
            }
        });
        const sortedSkills = Object.entries(skillMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10); // Top 10 Skills

        // C. Industries
        const industries = {};
        jobs.forEach((j) => {
          if (j.industry) industries[j.industry] = (industries[j.industry] || 0) + 1;
        });

        // D. Locations
        const locations = {};
        jobs.forEach((j) => {
          const city = j.location.split(",")[0].trim();
          locations[city] = (locations[city] || 0) + 1;
        });

        // E. Types & Companies
        const types = {};
        const companies = {};
        jobs.forEach((j) => {
          types[j.job_type] = (types[j.job_type] || 0) + 1;
          companies[j.company_name] = (companies[j.company_name] || 0) + 1;
        });

        setStats({
          totalJobs: jobs.length,
          activeJobs: jobs.filter((j) => j.status === "active").length,
          closedJobs: jobs.filter((j) => j.status !== "active").length,
          totalApplicants: allAppStatuses.length, // Accurate total count
          
          recentJobs: jobs.slice(0, 6),
          recentApplications: recentApps,
          
          topIndustries: Object.entries(industries).sort((a, b) => b[1] - a[1]).slice(0, 5),
          topCompanies: Object.entries(companies).sort((a, b) => b[1] - a[1]).slice(0, 5),
          topLocations: Object.entries(locations).sort((a, b) => b[1] - a[1]).slice(0, 5),
          
          jobsByType: types,
          applicationStats: statusCounts, // 🟢 Added
          topSkills: sortedSkills,        // 🟢 Added
        });

      } catch (err) {
        console.error(err);
        setIsError(true);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, isLoading, isError, error };
};
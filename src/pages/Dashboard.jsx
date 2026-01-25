// src/pages/Dashboard.jsx

import { useDashboardStats } from "../hooks/useDashboardStats";
import {
  StatsGrid,
  QuickStats,
  RecentJobs,
  TopIndustries,
  TopCompanies,
  JobTypesChart,
} from "../components/dashboard";

const Dashboard = () => {
  const { stats, isLoading, isError, error } = useDashboardStats();

  if (isError) {
    return (
      <section className="animate-fade-in">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <svg
            className="w-12 h-12 text-red-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-red-800 mb-1">
            Failed to load dashboard
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
      {/* Main Stats */}
      <StatsGrid stats={stats} isLoading={isLoading} />

      {/* Quick Stats */}
      <QuickStats stats={stats} isLoading={isLoading} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Jobs - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RecentJobs jobs={stats.recentJobs} isLoading={isLoading} />
        </div>

        {/* Top Industries */}
        <div>
          <TopIndustries
            industries={stats.topIndustries}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Types Chart */}
        <JobTypesChart jobsByType={stats.jobsByType} isLoading={isLoading} />

        {/* Top Companies */}
        <TopCompanies companies={stats.topCompanies} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default Dashboard;

import React from "react";
import { Briefcase, Activity, XCircle, Star } from "lucide-react";
import StatCard from "./StatCard";

const StatsGrid = ({ stats, isLoading }) => {
  const format = (n) => (n >= 1000 ? (n / 1000).toFixed(1) + "k" : n);
  const featuredCount = stats.recentJobs?.filter(j => j.is_featured).length || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <StatCard
        title="Total Jobs"
        value={format(stats.totalJobs)}
        icon={Briefcase}
        iconColor="text-blue-600"
        gradientColor="to-blue-600/10" // Subtle 10% opacity for glass effect
        sub="All Time"
        loading={isLoading}
      />

      <StatCard
        title="Active Jobs"
        value={format(stats.activeJobs)}
        icon={Activity}
        iconColor="text-brand-green"
        gradientColor="to-brand-green/10"
        sub="Live"
        loading={isLoading}
      />

      <StatCard
        title="Closed Jobs"
        value={format(stats.closedJobs)}
        icon={XCircle}
        iconColor="text-red-500"
        gradientColor="to-red-500/10"
        sub="Archived"
        loading={isLoading}
      />

      <StatCard
        title="Featured"
        value={format(featuredCount)}
        icon={Star}
        iconColor="text-amber-500"
        gradientColor="to-amber-500/10"
        sub="Promoted"
        loading={isLoading}
      />

    </div>
  );
};

export default StatsGrid;
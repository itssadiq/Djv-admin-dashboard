import { useDashboardStats } from "../hooks/useDashboardStats";
import {
  StatsGrid,
  RecentJobs,
  TopIndustries,
  TopCompanies,
  JobTypesChart,
} from "../components/dashboard";
import RecentActivity from "../components/dashboard/RecentActivity";
import ApplicationFunnel from "../components/dashboard/ApplicationFunnel";
import TopSkills from "../components/dashboard/TopSkills";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { stats, isLoading, isError } = useDashboardStats();

  if (isError) return <div className="p-8 text-center text-red-500 font-bold">Error loading dashboard.</div>;
  if (isLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-brand-green w-8 h-8" /></div>;

  return (
    <section className="space-y-8 animate-fade-in pb-20 max-w-[1600px] mx-auto">
      
      {/* 1. KEY METRICS (Full Width) */}
      <StatsGrid stats={stats} />

      {/* 2. ACTIVITY ROW (60% Jobs | 40% Activity) */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 items-stretch">
        
        {/* Recent Jobs (3/5 = 60%) */}
        <div className="xl:col-span-3 h-full">
           <RecentJobs jobs={stats.recentJobs} />
        </div>

        {/* Recent Activity (2/5 = 40%) */}
        <div className="xl:col-span-2 h-full min-h-[500px]">
           <RecentActivity applications={stats.recentApplications} />
        </div>

      </div>

      {/* 3. INSIGHTS ROW (3 Equal Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
         <TopSkills skills={stats.topSkills} />
         <TopIndustries industries={stats.topIndustries} />
         <TopCompanies companies={stats.topCompanies} />
      </div>

      {/* 4. BOTTOM ROW (50% Funnel | 50% Types) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
         <ApplicationFunnel stats={stats.applicationStats} />
         <JobTypesChart jobsByType={stats.jobsByType} />
      </div>

    </section>
  );
};

export default Dashboard;
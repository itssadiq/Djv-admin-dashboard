import { Outlet, useLocation } from "react-router-dom";
import { Header, Sidebar } from ".";

const AdminLayout = () => {
  const location = useLocation();

  // Logic to determine the header title based on current path
  const getTitle = () => {
    const path = location.pathname;

    if (path === "/dashboard" || path === "/dashboard/")
      return "Dashboard Overview";
    if (path.includes("/post-job")) return "Create New Listing";
    if (path.includes("/manage-jobs")) return "Active Opportunities";
    if (path.includes("/applications")) return "Candidate Pipeline";
    if (path.includes("/industries")) return "Industry Management";

    return "Overview";
  };

  return (
    <div className="bg-slate-50 text-slate-900 flex h-screen overflow-hidden font-sans">
      {/* Sidebar is always present in this layout */}
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header changes title dynamically */}
        <Header title={getTitle()} />

        <div className="flex-1 overflow-y-auto p-10 pb-24">
          {/* <Outlet /> renders the child route matching the URL */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

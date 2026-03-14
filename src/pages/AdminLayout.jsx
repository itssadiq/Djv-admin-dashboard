import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header, Sidebar } from "../components";

const AdminLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Logic to determine the header title
  const getTitle = () => {
    const path = location.pathname;
    if (path === "/dashboard" || path === "/dashboard/") return "Dashboard Overview";
    if (path.includes("/post-job")) return "Create New Listing";
    if (path.includes("/manage-jobs")) return "Active Opportunities";
    if (path.includes("/applications")) return "Candidate Pipeline";
    return "Overview";
  };

  return (
    <div className="bg-slate-50 text-slate-900 flex h-screen overflow-hidden font-sans">
      
      {/* ─── MOBILE BACKDROP (Click to close) ─── */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ─── SIDEBAR CONTAINER ─── */}
      {/* 
          Mobile: Fixed position, slides in/out using translate
          Desktop: Static position, always visible (translate-0)
      */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-brand-dark transition-transform duration-300 ease-in-out shrink-0
        lg:static lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Pass onClose so clicking a link on mobile closes the menu */}
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative w-full">
        
        {/* Header needs to know how to toggle the menu */}
        <Header 
          title={getTitle()} 
          onMenuClick={() => setIsSidebarOpen(true)} 
        />

        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 pb-24">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
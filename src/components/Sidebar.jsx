import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, PlusCircle, FileText, Users, X } from "lucide-react";
import { supabase } from "../lib/config"; 

const Sidebar = ({ onClose }) => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("Admin User"); // Default Name
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      // 1. Get Auth User
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // 2. Try to get name from Metadata (Google Login)
        const metaName = user.user_metadata?.full_name || user.user_metadata?.name;
        
        if (metaName) {
            setUserName(metaName);
        } else {
            // 3. Fallback: Fetch from Profiles Table (Email Login)
            const { data: profile } = await supabase
                .from('profiles')
                .select('first_name, last_name')
                .eq('id', user.id)
                .single();
            
            if (profile?.first_name) {
                setUserName(`${profile.first_name} ${profile.last_name || ""}`);
            }
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const getLinkClass = ({ isActive }) => {
    return `group relative flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-bold transition-all duration-300 border
      ${
        isActive
          ? "bg-gradient-to-r from-brand-green/10 to-transparent border-brand-green/20 text-brand-green shadow-sm"
          : "border-transparent text-slate-400 hover:text-white hover:bg-white/5 hover:border-white/5"
      }`;
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <aside className="h-full w-full bg-[#0B1120] text-white flex flex-col border-r border-slate-800 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-40 bg-brand-green/5 blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800/50 shrink-0 relative z-10">
        <h1 className="text-2xl font-black tracking-tight select-none">
          Dejob<span className="text-brand-green">.</span>
        </h1>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2 custom-scrollbar relative z-10">
        <div className="space-y-1">
            <p className="px-4 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-2">Overview</p>
            <NavLink to="/dashboard" end className={getLinkClass}>
            <LayoutDashboard size={20} className="group-hover:scale-110 transition-transform duration-300" /> 
            Dashboard
            </NavLink>
        </div>

        <div className="pt-6 space-y-1">
            <p className="px-4 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-2">Management</p>
            <NavLink to="/dashboard/post-job" className={getLinkClass}>
            <PlusCircle size={20} className="group-hover:scale-110 transition-transform duration-300" /> 
            Post a Job
            </NavLink>
            <NavLink to="/dashboard/manage-jobs" className={getLinkClass}>
            <FileText size={20} className="group-hover:scale-110 transition-transform duration-300" /> 
            Manage Jobs
            </NavLink>
            <NavLink to="/dashboard/applications" className={getLinkClass}>
            <Users size={20} className="group-hover:scale-110 transition-transform duration-300" /> 
            Applications
            </NavLink>
        </div>
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-800/50 bg-[#0F1623]/50 backdrop-blur-sm shrink-0 relative z-10">
        <div className="flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:border-brand-green/20 hover:bg-white/5 transition-all cursor-pointer group">
          
          {loading ? (
            <div className="flex items-center gap-3 w-full animate-pulse">
                <div className="w-10 h-10 rounded-lg bg-white/10"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-3 w-20 bg-white/10 rounded"></div>
                    <div className="h-2 w-32 bg-white/5 rounded"></div>
                </div>
            </div>
          ) : (
            <>
                <div className="w-10 h-10 rounded-lg bg-brand-green flex items-center justify-center text-brand-dark font-black text-xs shadow-lg shadow-brand-green/20 group-hover:scale-105 transition-transform">
                    {getInitials(userName)}
                </div>
                <div className="overflow-hidden">
                    <p className="text-sm font-bold truncate text-white group-hover:text-brand-green transition-colors">
                        {userName}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
            </>
          )}

        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
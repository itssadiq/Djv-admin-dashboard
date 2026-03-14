import React from "react";
import { useLogout } from "../hooks/useLogout";
import { Bell, LogOut, Menu } from "lucide-react"; // Import Icons

const Header = ({ title, onMenuClick }) => {
  const { logout, isLoading } = useLogout();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0 z-30 sticky top-0 lg:static">
      
      {/* Left: Title & Menu */}
      <div className="flex items-center gap-4">
        {/* 🟢 Mobile Menu Trigger */}
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg lg:hidden transition-colors"
        >
          <Menu size={24} />
        </button>

        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-800 truncate max-w-[200px] md:max-w-none">
            {title}
          </h2>
          {/* Hide subtitle on mobile to save space */}
          <p className="text-xs text-slate-500 mt-0.5 hidden md:block">
            Welcome back to your command center.
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        
      
        <div className="h-6 w-px bg-slate-200 mx-1"></div>

      <button
  onClick={handleLogout}
  disabled={isLoading}
  className="flex items-center gap-2 pl-4 pr-3 py-2 bg-brand-dark text-white rounded-lg shadow-md hover:bg-slate-800 hover:shadow-lg transition-all active:translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
>
  <span className="text-xs font-bold uppercase tracking-wider">Logout</span>
  <div className="bg-white/10 p-1 rounded-md">
    <LogOut size={14} />
  </div>
</button>
      </div>
    </header>
  );
};

export default Header;
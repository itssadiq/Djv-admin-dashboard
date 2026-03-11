// src/components/manageJobs/JobFilters.jsx

import { Search, X } from "lucide-react";

const selectClass =
  "w-full bg-white border border-slate-300 rounded-lg px-4 h-12 text-sm text-slate-800 shadow-sm focus:border-brand-green focus:ring-4 focus:ring-green-500/15 focus:outline-none appearance-none cursor-pointer";

const JobFilters = ({
  searchQuery,
  setSearchQuery,
  filters, // 🟢 Consolidated Object
  setFilters, // 🟢 Consolidated Setter
  filterOptions,
  clearFilters,
}) => {
  // Helper to update a specific filter
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const hasActiveFilters =
    searchQuery ||
    filters.company !== "all" ||
    filters.industry !== "all" ||
    filters.status !== "all" ||
    filters.type !== "all";

  // Safe check to prevent crash if options aren't loaded yet
  if (!filterOptions?.companies) return null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Search Input */}
        <div className="relative md:col-span-1">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 h-12 text-sm text-slate-800 shadow-sm focus:border-brand-green focus:ring-4 focus:ring-green-500/15 focus:outline-none"
          />
          <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
        </div>

        {/* Company Filter */}
        <select
          value={filters.company}
          onChange={(e) => handleFilterChange("company", e.target.value)}
          className={selectClass}
        >
          <option value="all">All Companies</option>
          {filterOptions.companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>

        {/* Industry Filter */}
        <select
          value={filters.industry}
          onChange={(e) => handleFilterChange("industry", e.target.value)}
          className={selectClass}
        >
          <option value="all">All Industries</option>
          {filterOptions.industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className={selectClass}
        >
          <option value="all">All Statuses</option>
          {filterOptions.statuses.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>

        {/* Type Filter */}
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange("type", e.target.value)}
          className={selectClass}
        >
          <option value="all">All Types</option>
          {filterOptions.types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <button
            onClick={clearFilters}
            className="text-sm text-slate-500 hover:text-red-500 flex items-center gap-1 transition-colors"
          >
            <X size={16} />
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default JobFilters;

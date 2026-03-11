import { useState, useEffect, useMemo } from "react";
import { useGetAllJobsQuery } from "../services/jobsApi"; // Assuming RTK Query
import { supabase } from "../lib/config";
import toast from "react-hot-toast";

export const useManageJobs = () => {
  // --- Data Fetching ---
  const { data: allJobs = [], isLoading, isError, error, refetch } = useGetAllJobsQuery();

  // --- Local State ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]); // 🟢 Store selected IDs
  const [isDeleting, setIsDeleting] = useState(false);
  
  // --- Filters State ---
  const [filters, setFilters] = useState({
    company: "all",
    industry: "all",
    status: "all",
    type: "all"
  });

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // --- Filtering Logic (Memoized for Speed) ---
  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            job.company_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCompany = filters.company === "all" || job.company_name === filters.company;
      const matchesIndustry = filters.industry === "all" || job.industry === filters.industry;
      const matchesStatus = filters.status === "all" || job.status === filters.status;
      const matchesType = filters.type === "all" || job.job_type === filters.type;

      return matchesSearch && matchesCompany && matchesIndustry && matchesStatus && matchesType;
    });
  }, [allJobs, searchQuery, filters]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- Bulk Selection Logic 🟢 ---
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Select all IDs visible on the CURRENT PAGE
      const idsOnPage = paginatedJobs.map((job) => job.id);
      // Combine with existing to avoid duplicates
      const uniqueIds = [...new Set([...selectedIds, ...idsOnPage])];
      setSelectedIds(uniqueIds);
    } else {
      // Deselect all on current page
      const idsOnPage = paginatedJobs.map((job) => job.id);
      setSelectedIds(selectedIds.filter(id => !idsOnPage.includes(id)));
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // --- Modal State ---
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    type: 'single', // 'single' or 'bulk'
    id: null,
    title: ''
  });

  const openDeleteModal = (id, title) => {
    setDeleteModal({ isOpen: true, type: 'single', id, title });
  };

  const openBulkDeleteModal = () => {
    setDeleteModal({ isOpen: true, type: 'bulk', id: null, title: `${selectedIds.length} jobs` });
  };

  const closeDeleteModal = () => {
    setDeleteModal((prev) => ({ ...prev, isOpen: false }));
  };

  // --- Delete Logic (Optimized) ---
  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      if (deleteModal.type === 'single') {
        // Single Delete
        const { error } = await supabase.from('jobs').delete().eq('id', deleteModal.id);
        if (error) throw error;
        toast.success("Job deleted successfully");
      } else {
        // Bulk Delete 🟢 (One request for multiple items)
        const { error } = await supabase.from('jobs').delete().in('id', selectedIds);
        if (error) throw error;
        toast.success(`${selectedIds.length} jobs deleted`);
        setSelectedIds([]); // Clear selection
      }
      
      refetch(); // Refresh list
      closeDeleteModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const filterOptions = useMemo(() => {
    return {
      companies: [...new Set(allJobs.map((j) => j.company_name).filter(Boolean))],
      industries: [...new Set(allJobs.map((j) => j.industry).filter(Boolean))],
      // 🟢 ADD THESE TWO:
      statuses: [...new Set(allJobs.map((j) => j.status).filter(Boolean))],
      types: [...new Set(allJobs.map((j) => j.job_type).filter(Boolean))],
    };
  }, [allJobs]);

  return {
    jobs: paginatedJobs,
    totalJobs: filteredJobs.length,
    isLoading,
    isError,
    error,
    isDeleting,
    currentPage,
    totalPages,
    handlePageChange: setCurrentPage,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filterOptions,
    clearFilters: () => {
        setFilters({ company: "all", industry: "all", status: "all", type: "all" });
        setSearchQuery("");
    },
    // New Selection Props
    selectedIds,
    handleSelectAll,
    handleSelectRow,
    // Modal Props
    deleteModal,
    openDeleteModal,
    openBulkDeleteModal,
    closeDeleteModal,
    confirmDelete,
  };
};
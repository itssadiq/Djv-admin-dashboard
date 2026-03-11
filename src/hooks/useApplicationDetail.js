// src/hooks/useApplicationDetail.js

import { useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useDeleteApplicationMutation,
} from "../services/applicationsApi";

export const useApplicationDetail = () => {
  const { jobId, userId } = useParams();
  const navigate = useNavigate();

  const {
    data: applications = [],
    isLoading,
    isError,
    error,
  } = useGetApplicationsQuery();
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateApplicationStatusMutation();
  const [deleteApplication, { isLoading: isDeleting }] =
    useDeleteApplicationMutation();

  // Find the specific application
  const application = applications.find(
    (app) => app.job_id === jobId && app.user_id === userId,
  );

  // Update status
  const handleUpdateStatus = useCallback(
    async (newStatus) => {
      try {
        await updateStatus({ jobId, userId, status: newStatus }).unwrap();
        return true;
      } catch (err) {
        console.error("Failed to update status:", err);
        return false;
      }
    },
    [jobId, userId, updateStatus],
  );

  // Delete application
  const handleDelete = useCallback(async () => {
    try {
      await deleteApplication({ jobId, userId }).unwrap();
      navigate("/dashboard/applications");
      return true;
    } catch (err) {
      console.error("Failed to delete:", err);
      return false;
    }
  }, [jobId, userId, deleteApplication, navigate]);

  // Go back
  const goBack = useCallback(() => {
    navigate("/dashboard/applications");
  }, [navigate]);

  // Download single document
  const downloadDocument = useCallback((url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  // Download all documents
  const downloadAllDocuments = useCallback(
    (documents) => {
      documents.forEach((doc, index) => {
        setTimeout(() => {
          downloadDocument(doc.url, doc.filename);
        }, index * 500); // Stagger downloads
      });
    },
    [downloadDocument],
  );

  return {
    application,
    isLoading,
    isError,
    error,
    isUpdating,
    isDeleting,
    handleUpdateStatus,
    handleDelete,
    goBack,
    downloadDocument,
    downloadAllDocuments,
  };
};

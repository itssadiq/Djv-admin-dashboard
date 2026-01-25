// src/hooks/useEditJob.js

import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import editJobSchema from "../schemas/editJobSchema";
import {
  useGetJobQuery,
  useUpdateJobMutation,
  useUploadLogoMutation,
  useDeleteLogoMutation,
} from "../services/jobsApi";

export const useEditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [logoPreview, setLogoPreview] = useState(null);
  const [originalLogoUrl, setOriginalLogoUrl] = useState(null);
  const [newLogoFile, setNewLogoFile] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const {
    data: job,
    isLoading: isLoadingJob,
    isError,
    error,
  } = useGetJobQuery(id);
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();
  const [uploadLogo] = useUploadLogoMutation();
  const [deleteLogo] = useDeleteLogoMutation();

  const form = useForm({
    resolver: zodResolver(editJobSchema),
    defaultValues: {
      is_remote: false,
      is_featured: false,
      status: "active",
    },
  });

  const { reset, setValue } = form;

  // Populate form when job data loads
  useEffect(() => {
    if (job) {
      reset({
        title: job.title,
        company_name: job.company_name,
        industry: job.industry,
        job_type: job.job_type,
        experience_level: job.experience_level,
        location: job.location,
        skills: Array.isArray(job.skills) ? job.skills.join(", ") : job.skills,
        description: job.description,
        salary_min: String(job.salary_min),
        salary_max: String(job.salary_max),
        is_remote: job.is_remote || false,
        is_featured: job.is_featured || false,
        status: job.status,
      });

      if (job.company_logo) {
        setLogoPreview(job.company_logo);
        setOriginalLogoUrl(job.company_logo);
      }
    }
  }, [job, reset]);

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("company_logo", file);
      setNewLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const onSubmit = async (data) => {
    try {
      setSubmitError(null);
      setSubmitSuccess(false);

      let logoUrl = originalLogoUrl;

      // If user selected a new logo
      if (newLogoFile) {
        // Delete old logo from storage if exists
        if (originalLogoUrl) {
          await deleteLogo(originalLogoUrl).unwrap();
        }

        // Upload new logo
        logoUrl = await uploadLogo(newLogoFile).unwrap();
      }

      // Destructure only needed fields
      const {
        title,
        company_name,
        industry,
        job_type,
        experience_level,
        location,
        skills,
        description,
        salary_min,
        salary_max,
        is_remote,
        is_featured,
        status,
      } = data;

      // Prepare job data
      const jobData = {
        id,
        title,
        company_name,
        industry,
        company_logo: logoUrl,
        job_type,
        experience_level,
        location,
        skills: Array.isArray(skills)
          ? skills
          : skills.split(",").map((s) => s.trim()),
        description,
        salary_min,
        salary_max,
        is_remote,
        is_featured,
        status,
      };

      // Update job
      await updateJob(jobData).unwrap();

      // Reset form
      reset();
      setLogoPreview(null);
      setNewLogoFile(null);

      // Scroll to top and show success
      setTimeout(() => {
        scrollToTop();
        setSubmitSuccess(true);
      }, 100);

      // Redirect to manage jobs after 2 seconds
      setTimeout(() => {
        navigate("/dashboard/manage-jobs");
      }, 2000);
    } catch (err) {
      setSubmitError(err.message || "Failed to update job. Please try again.");
      setTimeout(() => scrollToTop(), 100);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/manage-jobs");
  };

  return {
    form,
    job,
    isLoadingJob,
    isUpdating,
    isError,
    error,
    logoPreview,
    submitSuccess,
    submitError,
    setSubmitSuccess,
    setSubmitError,
    handleLogoChange,
    onSubmit,
    handleCancel,
  };
};

// src/hooks/usePostJob.js

import { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import postJobSchema from "../schemas/postJobSchema";
import {
  useCreateJobMutation,
  useUploadLogoMutation,
} from "../services/jobsApi";

export const usePostJob = () => {
  const formContainerRef = useRef(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [createJob] = useCreateJobMutation();
  const [uploadLogo] = useUploadLogoMutation();

  const form = useForm({
    resolver: zodResolver(postJobSchema),
    defaultValues: {
      is_remote: false,
      is_featured: false,
    },
  });

  const { reset, setValue } = form;

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("company_logo", file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const resetForm = useCallback(() => {
    reset();
    setLogoPreview(null);
  }, [reset]);

  const scrollToTop = useCallback(() => {
    // Method 1: Scroll the window
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Method 2: Scroll the form container if ref is available
    if (formContainerRef.current) {
      formContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    // Method 3: Fallback - scroll the main content area
    const mainContent = document.querySelector("main");
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      setSubmitError(null);
      setSubmitSuccess(false);

      // Upload logo if provided
      let logoUrl = null;
      if (data.company_logo) {
        const result = await uploadLogo(data.company_logo).unwrap();
        logoUrl = result;
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
      } = data;

      // Prepare job data
      const jobData = {
        title,
        company_name,
        industry,
        company_logo: logoUrl,
        job_type,
        experience_level,
        location,
        skills,
        description,
        salary_min,
        salary_max,
        is_remote,
        is_featured,
        status: "active",
      };

      // Create job
      await createJob(jobData).unwrap();

      // Success - reset form first, then scroll, then show message
      resetForm();

      // Use setTimeout to ensure DOM has updated before scrolling
      setTimeout(() => {
        scrollToTop();
        setSubmitSuccess(true);
      }, 100);

      // Auto-hide success message
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError(error.message || "Failed to post job. Please try again.");
      setTimeout(() => scrollToTop(), 100);
    }
  };

  return {
    form,
    formContainerRef,
    logoPreview,
    submitSuccess,
    submitError,
    setSubmitSuccess,
    setSubmitError,
    handleLogoChange,
    onSubmit,
  };
};

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
      job_type: "",
      experience_level: "",
      is_featured: false,
      salary_min: "",
      salary_max: "",
      hourly_wage: "",
    },
  });

  const scrollToTop = useCallback(() => {
    // 1. Try scrolling to the specific form container ref
    if (formContainerRef.current) {
      formContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    // 2. Fallback: Scroll the entire window
    window.scrollTo({ top: 0, behavior: "smooth" });

    // 3. Admin Layout specific: Scroll the main content area if standard window scroll fails
    const mainContent = document.querySelector("main");
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      setSubmitError(null);
      setSubmitSuccess(false);

      let logoUrl = null;
      if (data.company_logo && data.company_logo instanceof File) {
        const result = await uploadLogo(data.company_logo).unwrap();
        logoUrl = result;
      }

      const isWorkstudent = data.job_type === "Workstudent";

      const jobData = {
        title: data.title,
        company_name: data.company_name,
        industry: data.industry,
        company_logo: logoUrl,
        job_type: data.job_type,
        experience_level: data.experience_level,
        location: data.location,
        skills: data.skills,
        description: data.description,
        is_featured: data.is_featured,
        status: "active",
        salary_min: isWorkstudent ? null : Number(data.salary_min),
        salary_max: isWorkstudent ? null : Number(data.salary_max),
        hourly_wage: isWorkstudent ? Number(data.hourly_wage) : null,
      };

      await createJob(jobData).unwrap();

      // SUCCESS ACTIONS
      form.reset();
      setLogoPreview(null);

      // Trigger the scroll slightly before showing the message
      scrollToTop();

      // Delay the success message slightly to ensure scroll has started
      setTimeout(() => {
        setSubmitSuccess(true);
      }, 100);

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError(error.message || "Failed to post job. Please try again.");
      scrollToTop(); // Also scroll up to show the error message
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
    handleLogoChange: (e) => {
      const file = e.target.files?.[0];
      if (file) {
        form.setValue("company_logo", file);
        setLogoPreview(URL.createObjectURL(file));
      }
    },
    onSubmit,
  };
};

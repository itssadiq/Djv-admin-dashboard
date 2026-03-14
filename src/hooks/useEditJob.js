import { useState, useEffect } from "react";
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

  const form = useForm({ resolver: zodResolver(editJobSchema) });

  useEffect(() => {
    if (job) {
      form.reset({
        ...job,
        skills: Array.isArray(job.skills) ? job.skills.join(", ") : job.skills,
        salary_min: job.salary_min ? String(job.salary_min) : "",
        salary_max: job.salary_max ? String(job.salary_max) : "",
        hourly_wage: job.hourly_wage ? String(job.hourly_wage) : "",
      });
      if (job.company_logo) {
        setLogoPreview(job.company_logo);
        setOriginalLogoUrl(job.company_logo);
      }
    }
  }, [job, form]);

  const onSubmit = async (data) => {
    try {
      let logoUrl = originalLogoUrl;
      if (newLogoFile) {
        if (originalLogoUrl) await deleteLogo(originalLogoUrl).unwrap();
        logoUrl = await uploadLogo(newLogoFile).unwrap();
      }

      const isWorkstudent = data.job_type === "Workstudent";
      const jobData = {
        id,
        ...data,
        company_logo: logoUrl,
        skills: Array.isArray(data.skills)
          ? data.skills
          : data.skills.split(",").map((s) => s.trim()),
        salary_min: isWorkstudent ? null : Number(data.salary_min),
        salary_max: isWorkstudent ? null : Number(data.salary_max),
        hourly_wage: isWorkstudent ? Number(data.hourly_wage) : null,
      };

      await updateJob(jobData).unwrap();
      setSubmitSuccess(true);
      setTimeout(() => navigate("/dashboard/manage-jobs"), 2000);
    } catch (err) {
      setSubmitError("Failed to update job.");
    }
  };

  return {
    form,
    isLoadingJob,
    isUpdating,
    isError,
    error,
    logoPreview,
    submitSuccess,
    submitError,
    handleLogoChange: (e) => {
      const file = e.target.files?.[0];
      if (file) {
        form.setValue("company_logo", file);
        setNewLogoFile(file);
        setLogoPreview(URL.createObjectURL(file));
      }
    },
    onSubmit,
    handleCancel: () => navigate("/dashboard/manage-jobs"),
  };
};

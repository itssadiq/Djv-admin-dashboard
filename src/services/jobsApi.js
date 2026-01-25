// src/services/jobsApi.js

import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../lib/config";

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({
    // Create new job
    createJob: builder.mutation({
      async queryFn(jobData) {
        try {
          const { data, error } = await supabase
            .from("jobs")
            .insert(jobData)
            .select()
            .single();

          if (error) throw error;

          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ["Jobs"],
    }),

    // Upload company logo
    uploadLogo: builder.mutation({
      async queryFn(file) {
        try {
          const fileExt = file.name.split(".").pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
          const filePath = `company-logos/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from("logos")
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: urlData } = supabase.storage
            .from("logos")
            .getPublicUrl(filePath);

          return { data: urlData.publicUrl };
        } catch (error) {
          return { error: { message: "Failed to upload logo" } };
        }
      },
    }),

    // Get all jobs
    getJobs: builder.query({
      async queryFn() {
        try {
          const { data, error } = await supabase
            .from("jobs")
            .select("*")
            .order("created_at", { ascending: false });

          if (error) throw error;

          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ["Jobs"],
    }),

    // Get single job
    getJob: builder.query({
      async queryFn(id) {
        try {
          const { data, error } = await supabase
            .from("jobs")
            .select("*")
            .eq("id", id)
            .single();

          if (error) throw error;

          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: (result, error, id) => [{ type: "Jobs", id }],
    }),

    // Update job
    updateJob: builder.mutation({
      async queryFn({ id, ...jobData }) {
        try {
          const { data, error } = await supabase
            .from("jobs")
            .update(jobData)
            .eq("id", id)
            .select()
            .single();

          if (error) throw error;

          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Jobs", id },
        "Jobs",
      ],
    }),

    // Delete job
    deleteJob: builder.mutation({
      async queryFn(id) {
        try {
          const { error } = await supabase.from("jobs").delete().eq("id", id);

          if (error) throw error;

          return { data: { success: true } };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ["Jobs"],
    }),
  }),
});

export const {
  useCreateJobMutation,
  useUploadLogoMutation,
  useGetJobsQuery,
  useGetJobQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobsApi;

// src/services/applicationsApi.js

import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../lib/config";

export const applicationsApi = createApi({
  reducerPath: "applicationsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Applications"],
  endpoints: (builder) => ({
    // Get all applications with profile and job details
    getApplications: builder.query({
      async queryFn() {
        try {
          // First, get all applications
          const { data: applications, error: appError } = await supabase
            .from("applications")
            .select("*")
            .order("created_at", { ascending: false });

          console.log("Applications fetched:", applications);
          console.log("Applications error:", appError);

          if (appError) throw appError;

          // If no applications, return empty array
          if (!applications || applications.length === 0) {
            console.log("No applications found in database");
            return { data: [] };
          }

          // Get unique user IDs and job IDs
          const userIds = [...new Set(applications.map((app) => app.user_id))];
          const jobIds = [...new Set(applications.map((app) => app.job_id))];

          console.log("User IDs:", userIds);
          console.log("Job IDs:", jobIds);

          // Fetch profiles
          const { data: profiles, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .in("id", userIds);

          console.log("Profiles fetched:", profiles);
          console.log("Profiles error:", profileError);

          if (profileError) throw profileError;

          // Fetch jobs
          const { data: jobs, error: jobError } = await supabase
            .from("jobs")
            .select(
              "id, title, company_name, company_logo, location, job_type, experience_level",
            )
            .in("id", jobIds);

          console.log("Jobs fetched:", jobs);
          console.log("Jobs error:", jobError);

          if (jobError) throw jobError;

          // Create lookup maps
          const profileMap = (profiles || []).reduce((acc, profile) => {
            acc[profile.id] = profile;
            return acc;
          }, {});

          const jobMap = (jobs || []).reduce((acc, job) => {
            acc[job.id] = job;
            return acc;
          }, {});

          console.log("Profile map:", profileMap);
          console.log("Job map:", jobMap);

          // Combine data
          const combinedData = applications.map((app) => ({
            ...app,
            profiles: profileMap[app.user_id] || null,
            jobs: jobMap[app.job_id] || null,
          }));

          console.log("Combined data:", combinedData);

          return { data: combinedData };
        } catch (error) {
          console.error("Error in getApplications:", error);
          return { error: { message: error.message } };
        }
      },
      providesTags: ["Applications"],
    }),

    // Update application status
    updateApplicationStatus: builder.mutation({
      async queryFn({ jobId, userId, status }) {
        try {
          const { data, error } = await supabase
            .from("applications")
            .update({ status, updated_at: new Date().toISOString() })
            .eq("job_id", jobId)
            .eq("user_id", userId)
            .select()
            .single();

          if (error) throw error;

          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ["Applications"],
    }),

    // Delete application
    deleteApplication: builder.mutation({
      async queryFn({ jobId, userId }) {
        try {
          const { error } = await supabase
            .from("applications")
            .delete()
            .eq("job_id", jobId)
            .eq("user_id", userId);

          if (error) throw error;

          return { data: { success: true } };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ["Applications"],
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useDeleteApplicationMutation,
} = applicationsApi;

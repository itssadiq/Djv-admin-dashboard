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
          const { data: applications, error: appError } = await supabase
            .from("applications")
            .select("*")
            .order("created_at", { ascending: false });

          if (appError) throw appError;

          if (!applications || applications.length === 0) {
            return { data: [] };
          }

          const userIds = [...new Set(applications.map((app) => app.user_id))];
          const jobIds = [...new Set(applications.map((app) => app.job_id))];

          const { data: profiles, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .in("id", userIds);

          if (profileError) throw profileError;

          const { data: jobs, error: jobError } = await supabase
            .from("jobs")
            .select(
              "id, title, company_name, company_logo, location, job_type, experience_level",
            )
            .in("id", jobIds);

          if (jobError) throw jobError;

          const profileMap = (profiles || []).reduce((acc, profile) => {
            acc[profile.id] = profile;
            return acc;
          }, {});

          const jobMap = (jobs || []).reduce((acc, job) => {
            acc[job.id] = job;
            return acc;
          }, {});

          const combinedData = applications.map((app) => ({
            ...app,
            profiles: profileMap[app.user_id] || null,
            jobs: jobMap[app.job_id] || null,
          }));

          return { data: combinedData };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ["Applications"],
    }),

    // Update application status
    updateApplicationStatus: builder.mutation({
      async queryFn({ jobId, userId, status }) {
        try {
          console.log("Updating status:", { jobId, userId, status });

          const { data, error } = await supabase
            .from("applications")
            .update({
              status: status,
              updated_at: new Date().toISOString(),
            })
            .eq("job_id", jobId)
            .eq("user_id", userId)
            .select();

          console.log("Update result:", { data, error });

          if (error) throw error;

          return { data: data?.[0] || null };
        } catch (error) {
          console.error("Update error:", error);
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

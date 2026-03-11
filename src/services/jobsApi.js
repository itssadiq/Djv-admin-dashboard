import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../lib/config"; // Ensure this path is correct for your project

// Helper function to extract file path from URL
const getFilePathFromUrl = (url) => {
  if (!url) return null;
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const patterns = [
      /\/storage\/v1\/object\/public\/logos\/(.+)/,
      /\/logos\/(.+)/,
    ];
    for (const pattern of patterns) {
      const match = pathname.match(pattern);
      if (match && match[1]) return match[1];
    }
    return null;
  } catch (error) {
    console.error("Error parsing logo URL:", error);
    return null;
  }
};

// Helper function to delete logo from storage
const deleteLogoFromStorage = async (logoUrl) => {
  if (!logoUrl) return false;
  const filePath = getFilePathFromUrl(logoUrl);
  if (!filePath) return false;

  try {
    const { error } = await supabase.storage.from("logos").remove([filePath]);
    if (error) {
      console.error("Supabase storage delete error:", error);
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({
    
    // Create new job
    createJob: builder.mutation({
      async queryFn(jobData) {
        try {
          const { data, error } = await supabase.from("jobs").insert(jobData).select().single();
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
          const { error: uploadError } = await supabase.storage.from("logos").upload(filePath, file);
          if (uploadError) throw uploadError;
          const { data: urlData } = supabase.storage.from("logos").getPublicUrl(filePath);
          return { data: urlData.publicUrl };
        } catch (error) {
          return { error: { message: "Failed to upload logo" } };
        }
      },
    }),

    // Delete logo from storage
    deleteLogo: builder.mutation({
      async queryFn(logoUrl) {
        try {
          const success = await deleteLogoFromStorage(logoUrl);
          return { data: { success } };
        } catch (error) {
          return { error: { message: "Failed to delete logo" } };
        }
      },
    }),

    // 🟢 RENAMED ENDPOINT TO MATCH YOUR IMPORT
    getAllJobs: builder.query({
      async queryFn() {
        try {
          const { data, error } = await supabase.from("jobs").select("*").order("created_at", { ascending: false });
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
          const { data, error } = await supabase.from("jobs").select("*").eq("id", id).single();
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
          const { data, error } = await supabase.from("jobs").update(jobData).eq("id", id).select().single();
          if (error) throw error;
          return { data };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Jobs", id }, "Jobs"],
    }),

    // Delete job (with logo cleanup)
    deleteJob: builder.mutation({
      async queryFn(id) {
        try {
          const { data: job } = await supabase.from("jobs").select("company_logo").eq("id", id).single();
          if (job?.company_logo) await deleteLogoFromStorage(job.company_logo);
          const { error: deleteError } = await supabase.from("jobs").delete().eq("id", id);
          if (deleteError) throw deleteError;
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
  useDeleteLogoMutation,
  useGetAllJobsQuery, // 🟢 Matches ManageJobs
  useGetJobQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobsApi;

// 🟢 ALIAS for compatibility
export const useGetJobsQuery = useGetAllJobsQuery; 
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { authApi } from "../services/auth";
import { jobsApi } from "../services/jobsApi";
import { applicationsApi } from "../services/applicationsApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
    [applicationsApi.reducerPath]: applicationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(jobsApi.middleware)
      .concat(applicationsApi.middleware),
});

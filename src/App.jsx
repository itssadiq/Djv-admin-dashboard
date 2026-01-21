import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Header, Sidebar } from "./components";
import {
  Applications,
  Dashboard,
  Industries,
  Login,
  ManageJobs,
  PostJob,
} from "./pages";
import AdminLayout from "./pages/AdminLayout";

function App() {
  return (
    <Routes>
      {/* 1. Public Route: Login Page at root "/" */}
      <Route path="/" element={<Login />} />

      {/* 2. Protected Routes: All Admin pages under "/dashboard" */}
      <Route path="/dashboard" element={<AdminLayout />}>
        {/* This renders when url is exactly "/dashboard" */}
        <Route index element={<Dashboard />} />

        {/* Renders at "/dashboard/post-job" */}
        <Route path="post-job" element={<PostJob />} />

        {/* Renders at "/dashboard/manage-jobs" */}
        <Route path="manage-jobs" element={<ManageJobs />} />

        {/* Renders at "/dashboard/applications" */}
        <Route path="applications" element={<Applications />} />

        {/* Renders at "/dashboard/industries" */}
        <Route path="industries" element={<Industries />} />
      </Route>

      {/* 3. Fallback: If unknown route, go to login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

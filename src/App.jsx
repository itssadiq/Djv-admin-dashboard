import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

// Components
import AuthInitializer from "./components/AuthInitializer";
import ProtectedRoute from "./components/ProtectedRoute";
// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PostJob from "./pages/PostJob";
import ManageJobs from "./pages/ManageJobs";
import Applications from "./pages/Applications";
import Industries from "./pages/Industries";
import AdminLayout from "./pages/AdminLayout";

function App() {
  return (
    <Provider store={store}>
      <AuthInitializer>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes with Admin Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/post-job" element={<PostJob />} />
              <Route path="/dashboard/manage-jobs" element={<ManageJobs />} />
              <Route
                path="/dashboard/applications"
                element={<Applications />}
              />
              <Route path="/dashboard/industries" element={<Industries />} />
            </Route>
          </Route>

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* 404 - Redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthInitializer>
    </Provider>
  );
}

export default App;

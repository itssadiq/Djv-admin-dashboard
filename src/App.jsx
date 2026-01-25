// src/App.jsx

import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

import AuthInitializer from "./components/AuthInitializer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PostJob from "./pages/PostJob";
import EditJob from "./pages/EditJob";
import ManageJobs from "./pages/ManageJobs";
import Applications from "./pages/Applications";
import Industries from "./pages/Industries";

function App() {
  return (
    <Provider store={store}>
      <AuthInitializer>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/post-job" element={<PostJob />} />
              <Route path="/dashboard/edit-job/:id" element={<EditJob />} />
              <Route path="/dashboard/manage-jobs" element={<ManageJobs />} />
              <Route
                path="/dashboard/applications"
                element={<Applications />}
              />
              <Route path="/dashboard/industries" element={<Industries />} />
            </Route>
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthInitializer>
    </Provider>
  );
}

export default App;

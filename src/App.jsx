import { Route, Routes, useLocation } from "react-router-dom";
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

function App() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard Overview";
      case "/post-job":
        return "Create New Listing";
      case "/manage-jobs":
        return "Active Opportunities";
      case "/applications":
        return "Candidate Pipeline";
      case "/industries":
        return "Industry Management";
      default:
        return "Overview";
    }
  };

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }
  return (
    <div className="bg-slate-50 text-slate-900 flex h-screen overflow-hidden font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header title={getTitle()} />
        <div className="flex-1 overflow-y-auto p-10 pb-24">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/manage-jobs" element={<ManageJobs />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/industries" element={<Industries />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;

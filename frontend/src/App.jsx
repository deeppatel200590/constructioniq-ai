import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Route,Routes } from "react-router-dom";
import Verify from "./components/Verify"
import Dashboard from "./components/Layout/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Project from "./components/Layout/Project/Project.jsx";
import Upload from "./components/Layout/Project/Upload.jsx";
import Analyze from "./components/Layout/Project/Analyze.jsx";
import Reports from "./components/Layout/Project/Reports.jsx";
import History from "./components/Layout/Project/History.jsx";
import ProjectSetting from "./components/Layout/Project/ProjectsSetting.jsx";

const App = () => {
  return (
    <div>
      <Routes>

        {/* Public Route */}
        <Route path="/" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/verify" element={<Verify/>}></Route>

        {/* Protected Route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/project/:id" element={<Project/>}></Route>
          <Route path="/upload/:id" element={<Upload/>}/>
          <Route path="/analyze/:id" element={<Analyze/>}/>
          <Route path="/reports/:id" element={<Reports/>}/>
          <Route path="/history/:id" element={<History/>}/>
          <Route path="/projectsetting/:id" element={<ProjectSetting/>}/>
        </Route>

      </Routes>
    </div>
  );
};

export default App;
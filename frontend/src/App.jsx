import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Route,Routes } from "react-router-dom";
import Verify from "./components/Verify"
import Dashboard from "./components/Layout/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

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
        </Route>

      </Routes>
    </div>
  );
};

export default App;
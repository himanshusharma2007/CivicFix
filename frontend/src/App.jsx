import React, { use, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Profile from "./pages/profile/Profile";
import RaiseIssuePage from "./components/RaiseIssue";
import IssueDetails from "./pages/issue/IssueDetails";
import { useDispatch } from "react-redux";
import { getProfile } from "./redux/slice/authSlice";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/raise-issue" element={<RaiseIssuePage />} />
        <Route path="/issue/:id" element={<IssueDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

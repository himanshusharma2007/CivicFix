import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, clearError } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Redirect after signup
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    dispatch(clearError());
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Sign Up
          </h2>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {error.message || "Signup failed"}
            </p>
          )}

          <button
          onClick={handleSubmit}
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition duration-150 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIssue, clearError } from "../redux/slice/issueSlice";
import { useNavigate } from "react-router-dom";

export default function RaiseIssuePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.issues);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    image: null,
  });

  useEffect(() => {
    return () => {
      dispatch(clearError()); // cleanup on unmount
    };
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createIssue(formData))
      .unwrap()
      .then(() => {
        alert("Issue raised successfully!");
        navigate("/"); // change to "/my-issues" if needed
      })
      .catch(() => {
        // Error shown below
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Raise an Issue
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
              <input
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Broken streetlight, pothole, etc."
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Describe the issue in detail..."
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Location</label>
              <input
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="e.g., MG Road, Jaipur"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Upload Image (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-200 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">
                {error.message || "Failed to raise issue. Please try again."}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition duration-150 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Issue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
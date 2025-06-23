import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIssue, clearError } from "../redux/slice/issueSlice"; // Adjust path if needed
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-lg space-y-6"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-semibold text-center">Raise an Issue</h2>

        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Broken streetlight, pothole, etc."
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Describe the issue in detail..."
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="e.g., MG Road, Jaipur"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Image (optional)</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Issue"}
        </button>
      </form>
    </div>
  );
}

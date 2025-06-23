import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllIssues,
  getResolvedIssues,
  getHighSeverityIssues,
  upvoteIssue,
  addComment,
} from "../../redux/slice/issueSlice";
import { BASE_URL } from "../../config";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { issues, loading } = useSelector((state) => state.issues);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [commentInputs, setCommentInputs] = useState({});
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      if (filter === "resolved") await dispatch(getResolvedIssues());
      else if (filter === "high") await dispatch(getHighSeverityIssues());
      else await dispatch(getAllIssues());
    };
    fetchData();
  }, [dispatch, filter]);

  const handleUpvote = async (id) => {
    if (!isAuthenticated) {
      alert("Please log in to upvote.");
      return;
    }
    await dispatch(upvoteIssue(id));
    if (filter === "resolved") dispatch(getResolvedIssues());
    else if (filter === "high") dispatch(getHighSeverityIssues());
    else dispatch(getAllIssues());
  };

  const handleCommentChange = (e, issueId) => {
    setCommentInputs((prev) => ({
      ...prev,
      [issueId]: e.target.value,
    }));
  };

  const handleAddComment = async (issueId) => {
    if (!isAuthenticated) {
      alert("Please log in to comment.");
      return;
    }

    const comment = commentInputs[issueId];
    if (!comment) return;

    await dispatch(addComment({ id: issueId, commentData: { message: comment } }));
    if (filter === "resolved") dispatch(getResolvedIssues());
    else if (filter === "high") dispatch(getHighSeverityIssues());
    else dispatch(getAllIssues());
    setCommentInputs((prev) => ({ ...prev, [issueId]: "" }));
  };

  const handleViewDetails = (issueId) => {
    navigate(`/issue/${issueId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
          Reported Issues
        </h1>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-sm rounded-lg border transition duration-150 ${
              filter === "all"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
            }`}
          >
            All Issues
          </button>
          <button
            onClick={() => setFilter("resolved")}
            className={`px-4 py-2 text-sm rounded-lg border transition duration-150 ${
              filter === "resolved"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
            }`}
          >
            Resolved Issues
          </button>
          <button
            onClick={() => setFilter("high")}
            className={`px-4 py-2 text-sm rounded-lg border transition duration-150 ${
              filter === "high"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
            }`}
          >
            High Severity
          </button>
        </div>

        {loading ? (
          <p className="text-gray-600 text-center text-sm">Loading...</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {issues.map((issue) => (
              <div
                key={issue._id}
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
              >
                {issue.image && (
                  <img
                    src={`${BASE_URL}${issue.image}`}
                    alt={issue.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                    {issue.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {issue.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4">
                    <span>
                      <strong>By:</strong> {issue.user?.name || "Anonymous"}
                    </span>
                    <span>
                      <strong>Location:</strong> {issue.location}
                    </span>
                    <span>
                      <strong>Severity:</strong>{" "}
                      <span
                        className={`font-medium ${
                          issue.severity === "High"
                            ? "text-red-500"
                            : issue.severity === "Medium"
                            ? "text-yellow-500"
                            : "text-green-500"
                        }`}
                      >
                        {issue.severity}
                      </span>
                    </span>
                    <span>
                      <strong>Status:</strong>{" "}
                      <span className="capitalize">{issue.status}</span>
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <button
                    onClick={() => handleUpvote(issue._id)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition duration-150 w-full justify-center ${
                      issue.upvotes?.includes(user?._id)
                        ? "bg-gray-900 text-white"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                    Upvote ({issue.upvotes?.length || 0})
                  </button>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Comments
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1 max-h-24 overflow-y-auto">
                    {issue.comments?.length > 0 ? (
                      issue.comments.map((c, idx) => (
                        <li key={idx} className="flex gap-1">
                          <span className="font-medium min-w-[80px]">
                            {c.user?.name || "User"}:
                          </span>
                          <span className="line-clamp-2">{c.message}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-400">No comments yet.</li>
                    )}
                  </ul>
                </div>

                <div className="flex flex-col gap-2 mt-auto">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      value={commentInputs[issue._id] || ""}
                      onChange={(e) => handleCommentChange(e, issue._id)}
                    />
                    <button
                      onClick={() => handleAddComment(issue._id)}
                      className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition duration-150"
                    >
                      Submit
                    </button>
                  </div>
                  <button
                    onClick={() => handleViewDetails(issue._id)}
                    className="px-4 py-2 text-sm border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-150"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/slice/authSlice";
import { getMyIssues } from "../../redux/slice/issueSlice";
import { Link } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const { myIssues, loading: issuesLoading } = useSelector((state) => state.issues);

  const [showIssues, setShowIssues] = useState(false);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleLoadMyIssues = () => {
    dispatch(getMyIssues());
    setShowIssues(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Profile
        </h2>

        {authLoading ? (
          <p className="text-gray-600 text-center text-sm">Loading profile...</p>
        ) : user ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Profile Card */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xl font-medium mb-4">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{user.name}</h3>
              <div className="text-sm text-gray-600 text-center space-y-1">
                <p>{user.email}</p>
                <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
              <button
                onClick={handleLoadMyIssues}
                className="mt-6 w-full px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition duration-150"
              >
                View My Reported Issues
              </button>
            </div>

            {/* Issues Section */}
            <div className="lg:col-span-2">
              {showIssues && (
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    My Reported Issues
                  </h3>
                  {issuesLoading ? (
                    <p className="text-gray-600 text-center text-sm">Loading issues...</p>
                  ) : myIssues.length === 0 ? (
                    <p className="text-gray-500 text-center text-sm">
                      No issues reported yet.
                    </p>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {myIssues.map((issue) => (
                        <div
                          key={issue._id}
                          className="border border-gray-100 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                          <h4 className="font-semibold text-gray-900 line-clamp-1">
                            {issue.title}
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                            {issue.description}
                          </p>
                          <div className="text-xs text-gray-500 space-y-1">
                            <p>
                              <span className="font-medium">Location:</span>{" "}
                              {issue.location}
                            </p>
                            <p>
                              <span className="font-medium">Status:</span>{" "}
                              <span className="capitalize">{issue.status}</span>
                            </p>
                            <p>
                              <span className="font-medium">Severity:</span>{" "}
                              <span
                                className={`inline-block px-2 py-0.5 text-xs rounded-full capitalize ${
                                  issue.severity === "High"
                                    ? "bg-red-50 text-red-500"
                                    : issue.severity === "Medium"
                                    ? "bg-yellow-50 text-yellow-500"
                                    : "bg-green-50 text-green-500"
                                }`}
                              >
                                {issue.severity}
                              </span>
                            </p>
                          </div>
                          <Link
                            to={`/issue/${issue._id}`}
                            className="text-gray-900 text-sm hover:underline mt-2 inline-block"
                          >
                            View Details
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-red-500 text-center text-sm">User not found.</p>
        )}
      </div>
    </div>
  );
}
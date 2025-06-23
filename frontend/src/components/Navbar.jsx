import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slice/authSlice";

export default function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRaiseIssueClick = () => {
    if (isAuthenticated) {
      navigate("/raise-issue");
    } else {
      alert("Please login or register to raise an issue.");
      navigate("/login");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-10 px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left - Brand and Menu Links */}
        <div className="flex items-center gap-6">
          <div className="text-lg font-semibold text-gray-900">
            <Link to="/" className="hover:text-gray-600 transition duration-150">
            CivicFix
            </Link>
          </div>
          <div className="text-sm text-gray-700">
            <Link to="/" className="hover:text-gray-600 transition duration-150">
              Home
            </Link>
          </div>
        </div>

        {/* Right - Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleRaiseIssueClick}
            className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition duration-150"
          >
            Raise Issue
          </button>

          {!isAuthenticated ? (
            <>
              <Link to="/register">
                <button className="px-4 py-2 text-sm border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-150">
                  Register
                </button>
              </Link>
              <Link to="/login">
                <button className="px-4 py-2 text-sm bg-gray-50 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 transition duration-150">
                  Login
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile">
                <button className="px-4 py-2 text-sm border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-150">
                  Profile
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition duration-150"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
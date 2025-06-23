import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getIssueById, upvoteIssue, addComment, clearError } from '../../redux/slice/issueSlice';
import { BASE_URL } from '../../config';

const IssueDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { currentIssue, loading, error } = useSelector((state) => state.issues);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [commentInput, setCommentInput] = useState('');
  const [commentError, setCommentError] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(getIssueById(id));
    }
    return () => {
      dispatch(clearError());
    };
  }, [dispatch, id]);

  const handleUpvote = async () => {
    if (!isAuthenticated) {
      alert('Please log in to upvote.');
      return;
    }
    try {
      await dispatch(upvoteIssue(id)).unwrap();
    } catch (err) {
      alert('Failed to upvote. Please try again.');
    }
  };

  const handleCommentChange = (e) => {
    setCommentInput(e.target.value);
    setCommentError(null);
  };

  const handleAddComment = async () => {
    if (!isAuthenticated) {
      alert('Please log in to comment.');
      return;
    }
    if (!commentInput.trim()) {
      setCommentError('Comment cannot be empty.');
      return;
    }

    try {
      await dispatch(addComment({ id, commentData: { message: commentInput } })).unwrap();
      setCommentInput('');
    } catch (err) {
      setCommentError('Failed to add comment. Please try again.');
    }
  };

  const handleRetry = () => {
    dispatch(clearError());
    dispatch(getIssueById(id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <p className="text-gray-600 text-center text-sm">Loading issue details...</p>
        ) : error ? (
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm text-center">
            <p className="text-red-500 text-sm mb-4">
              {error.message || 'Failed to load issue details.'}
            </p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition duration-150"
            >
              Retry
            </button>
          </div>
        ) : !currentIssue ? (
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm text-center">
            <p className="text-gray-600 text-sm">No issue found.</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            {currentIssue.image && (
              <img
                src={`${BASE_URL}${currentIssue.image}`}
                alt={currentIssue.title}
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
            )}
            <h1 className="text-xl font-semibold text-gray-900 mb-4">
              {currentIssue.title}
            </h1>
            <p className="text-gray-600 text-sm mb-6">{currentIssue.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
              <div>
                <span className="font-medium">Reported by:</span>{' '}
                {currentIssue.user?.name || 'Unknown'}
              </div>
              <div>
                <span className="font-medium">Location:</span> {currentIssue.location}
              </div>
              <div>
                <span className="font-medium">Severity:</span>{' '}
                <span
                  className={`inline-block px-2 py-0.5 text-xs rounded-full capitalize ${
                    currentIssue.severity === 'High'
                      ? 'bg-red-50 text-red-500'
                      : currentIssue.severity === 'Medium'
                      ? 'bg-yellow-50 text-yellow-500'
                      : 'bg-green-50 text-green-500'
                  }`}
                >
                  {currentIssue.severity}
                </span>
              </div>
              <div>
                <span className="font-medium">Status:</span>{' '}
                <span className="capitalize">{currentIssue.status}</span>
              </div>
            </div>

            <button
              onClick={handleUpvote}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition duration-150 mb-6 ${
                currentIssue.upvotes?.includes(user?._id)
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
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
              {currentIssue.upvotes?.includes(user?._id)
                ? `Already Upvoted (${currentIssue.upvotes?.length || 0})`
                : `Upvote (${currentIssue.upvotes?.length || 0})`}
            </button>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">Comments</h3>
              {currentIssue.comments?.length > 0 ? (
                <ul className="mb-6 space-y-2 max-h-64 overflow-y-auto">
                  {currentIssue.comments.map((comment) => (
                    <li
                      key={comment._id}
                      className="border border-gray-100 rounded-lg p-3 bg-gray-50 text-sm text-gray-600"
                    >
                      <span className="font-medium">{comment.user?.name || 'Unknown'}:</span>{' '}
                      {comment.message}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm mb-6">No comments yet.</p>
              )}

              {isAuthenticated ? (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={commentInput}
                      onChange={handleCommentChange}
                      className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                    <button
                      onClick={handleAddComment}
                      className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition duration-150"
                    >
                      Submit
                    </button>
                  </div>
                  {commentError && (
                    <p className="text-red-500 text-sm">{commentError}</p>
                  )}
                </div>
              ) : (
                <p className="text-gray-600 text-sm">
                  Please log in to add comments.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueDetails;
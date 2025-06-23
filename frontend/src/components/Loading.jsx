import React from 'react';

const Loading = ({ message = 'Loading...', size = 'md' }) => {
  // Define size classes for the spinner
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div
        className={`rounded-full border-t-gray-900 border-gray-200 animate-spin ${sizeClasses[size]}`}
        role="status"
        aria-label="loading"
      ></div>
      <p className="mt-4 text-gray-600 text-sm">{message}</p>
    </div>
  );
};

export default Loading;
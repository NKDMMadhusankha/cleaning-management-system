import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Simple Spinner */}
        <div className="mb-8">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#8cc53f] rounded-full animate-spin mx-auto"></div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#202020] mb-2">CleanBee</h2>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>

    </div>
  );
};

export default Loading;

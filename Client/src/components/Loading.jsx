import React, { useState, useEffect } from 'react';

const Loading = () => {
  const descriptions = [
    "Freshness is just a moment away",
    "Sparkling clean solutions loading",
    "Your spotless space awaits"
  ];

  const [currentDescription, setCurrentDescription] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentDescription((prev) => (prev + 1) % descriptions.length);
        setIsVisible(true);
      }, 200);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center">
        {/* Modern Pulse Loader */}
        <div className="mb-8 relative">
          <div className="w-16 h-16 bg-[#8cc53f] rounded-full animate-pulse opacity-75"></div>
          <div className="absolute top-0 left-0 w-16 h-16 bg-[#8cc53f] rounded-full animate-ping opacity-50"></div>
          <div className="absolute top-2 left-2 w-12 h-12 bg-white rounded-full"></div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#202020] mb-2">CleanBee</h2>
          <p className={`text-sm text-[#8cc53f] font-medium mb-3 transition-all duration-300 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}>
            {descriptions[currentDescription]}
          </p>
          <div className="flex justify-center items-center space-x-1">
            <div className="w-2 h-2 bg-[#8cc53f] rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-[#8cc53f] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-[#8cc53f] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

import React from 'react';

const LoadingDialog = ({ loading }) => {
  if (!loading) return null;
  
  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 sm:p-8 mx-4 max-w-md w-full">
        <div className="flex flex-col items-center justify-center gap-4 py-4">
          <div className="text-center mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#15b989] mb-2">Generating Your Course</h2>
            <p className="text-gray-600">Our AI is crafting your perfect course layout...</p>
          </div>
          
          {/* Loading GIF */}
          <div className="flex justify-center">
            <img
              src="/resolution.gif"
              alt="Loading animation"
              className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
            />
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">Please wait</h3>
            <p className="text-sm text-gray-500 mt-1">
              This may take a few moments...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDialog;
import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const LoadingDialog = ({ loading }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="w-[95vw] max-w-xs sm:max-w-md md:max-w-lg p-3 sm:p-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-base sm:text-lg md:text-xl">Generating Your Course</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 py-3 sm:py-4">
              {/* Add the GIF here */}
              <img
                src="/resolution.gif"
                alt="Loading animation"
                className="w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 object-contain"
              />
              <div className="text-center">
                <h2 className="text-sm xs:text-base sm:text-lg font-semibold">Please wait</h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Our AI is crafting your perfect course layout...
                </p>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoadingDialog;
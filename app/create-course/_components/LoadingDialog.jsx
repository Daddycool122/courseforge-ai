import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

const LoadingDialog = ({ loading }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Generating Your Course</AlertDialogTitle>
          {/* Fix: Replace <p> with <div> to avoid nesting issues */}
          <AlertDialogDescription>
            <div className="flex flex-col items-center justify-center gap-4 py-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              {/* This h2 was causing the hydration error when inside a <p> */}
              <div className="text-center">
                <h2 className="text-lg font-semibold">Please wait</h2>
                <p className="text-sm text-gray-500">
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
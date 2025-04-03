import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import React from "react";

function LoadingDialog({loading}) {
  return (
    <div>
      <AlertDialog open={loading}>
        <AlertDialogContent>
        <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogHeader>
            
            <AlertDialogDescription>
              <div className="flex flex-col items-center justify-center">
              <Image src={'/resolution.gif'} alt={'no'} width={100} height={100}/>
              <h2>Please wait... AI is generating your course</h2>
              </div>
              
              
            </AlertDialogDescription>
          </AlertDialogHeader>
          
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default LoadingDialog;

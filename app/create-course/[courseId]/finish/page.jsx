"use client"

import React from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { useRouter } from "next/navigation";
import { db } from "@/configs/db";
import { MdContentCopy } from "react-icons/md";

import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useState,useEffect } from "react";
import { and } from "drizzle-orm";
import { CourseList } from "@/configs/schema";



function FinishScreen({params: paramsPromise}) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const params = React.use(paramsPromise); // Unwrap the Promise here
  const router = useRouter();

  useEffect(() => {
    if (params && user) {
      // Check for both params and user
      GetCourse();
    }
  }, [params?.courseId, user?.primaryEmailAddress?.emailAddress]); // Use specific values

  const GetCourse = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, params.courseId),
            eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );
      console.log(result);
      setCourse(result[0]);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };
  return(
    
        <div className="px-10 md:px-20 lg:px-40 my-7">
        <h2 className="text-center font-bold text-2xl text-[#15b989]">Here yo GO! Your Course is ready🌟</h2>
        <CourseBasicInfo course={course} refreshData={()=>console.log()}/>
            <h2 className="mt-3">Course URL</h2>
            <h2 className="text-center flex gap-5 items-center p-4 m-2 text-gray-400 border rounded">{process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{course?.courseId}
            <MdContentCopy className="h-5 w-5 cursor-pointer"
            onClick={async()=>await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST_NAME}/create-course/${course?.courseId}/start`)}
            />
            </h2>

        </div>
      
    )};
  


export default FinishScreen;

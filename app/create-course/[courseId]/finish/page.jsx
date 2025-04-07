"use client";
import React, { useState, useEffect } from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { useRouter } from "next/navigation";
import { db } from "@/configs/db";
import { MdContentCopy } from "react-icons/md";
import { useUser } from "@clerk/nextjs";
import { eq, and } from "drizzle-orm";
import { CourseList } from "@/configs/schema";

function FinishScreen({ params: paramsPromise }) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const params = React.use(paramsPromise); // Unwrap the Promise here
  const router = useRouter();

  useEffect(() => {
    if (params && user) {
      GetCourse();
    }
  }, [params?.courseId, user?.primaryEmailAddress?.emailAddress]);

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

  return (
    <div className="px-4 md:px-10 lg:px-40 my-4 md:my-7 min-h-screen">
      <h2 className="text-center font-bold text-xl md:text-2xl text-[#15b989] mb-4 md:mb-6">
        Here you GO! Your Course is ready🌟
      </h2>
      
      <CourseBasicInfo course={course} refreshData={() => console.log()} />

      <h2 className="mt-2 md:mt-3 text-sm md:text-base">Course URL</h2>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 md:p-4 m-2 text-gray-400 border rounded-lg">
        <span className="text-xs md:text-sm break-all text-center sm:text-left">
          {process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{course?.courseId}
        </span>
        <MdContentCopy
          className="h-4 w-4 md:h-5 md:w-5 cursor-pointer text-[#15b989] flex-shrink-0"
          onClick={async () =>
            await navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_HOST_NAME}/create-course/${course?.courseId}/start`
            )
          }
        />
      </div>
    </div>
  );
}

export default FinishScreen;
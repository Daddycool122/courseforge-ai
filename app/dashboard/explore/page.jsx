"use client";
import { CourseList } from "@/configs/schema";
import React, { useEffect, useState } from "react";
import { db } from "@/configs/db";
import CourseCard from "../_components/CourseCard";
import { Button } from "@/components/ui/button";

const Explore = () => {
  const [courseList, setCourseList] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    GetAllCourse();
  }, [pageIndex]);

  const GetAllCourse = async () => {
    const result = await db.select().from(CourseList)
      .limit(9)
      .offset(pageIndex * 9);
    setCourseList(result);
  };

  return (
    <div className="px-2 md:px-0">
      <h2 className="font-bold text-xl md:text-3xl">Explore more courses</h2>
      <p className="text-sm md:text-base">Explore more courses with AI</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {courseList.map((course, index) => (
          <CourseCard key={index} course={course} displayUser={true} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between mt-5 gap-3">
        {pageIndex !== 0 && (
          <Button 
            className="bg-[#15b989] hover:bg-[#15b989] w-full sm:w-auto" 
            onClick={() => setPageIndex(pageIndex - 1)}
          >
            Prev
          </Button>
        )}
        <Button 
          className="bg-[#15b989] hover:bg-[#15b989] w-full sm:w-auto" 
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Explore;
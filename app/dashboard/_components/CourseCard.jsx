import React from "react";
import Image from "next/image";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import DropDownComponent from "./DropDownComponent";
import { IoEllipsisVertical, IoBookOutline } from "react-icons/io5";
import { CourseList } from "@/configs/schema";
import Link from "next/link";

function CourseCard({ course, refreshData, displayUser = false }) {
  const handleOnDelete = async () => {
    const resp = await db.delete(CourseList)
      .where(eq(CourseList.id, course.id))
      .returning({ id: CourseList.id });

    if (resp) {
      refreshData();
    }
  };

  return (
    <div className="rounded-2xl shadow-md border p-2 md:p-4 hover:scale-105 transition-all duration-200 ease-in-out hover:border-green-300 cursor-pointer mt-1">
      <Link href={`/course/${course?.courseId}`}>
        <Image 
          src={"https://i.pinimg.com/1200x/55/30/89/553089e42cf4dd07f0364a768a5bd669.jpg"} 
          alt="course" 
          width={50} 
          height={50} 
          className="w-full rounded-lg h-[120px] md:h-[170px] object-cover"
        />
      </Link>
      <div>
        <h2 className="font-md flex justify-between items-center text-base md:text-lg p-2">
          {course?.courseOutput?.["Course Name"] || course?.courseOutput?.["Course name"]}
          {!displayUser && <DropDownComponent handleOnDelete={handleOnDelete}><IoEllipsisVertical className="text-xl md:text-2xl" /></DropDownComponent>}
        </h2>
        <p className="text-xs md:text-sm text-gray-400 p-2">{course?.category}</p>
        <div className="flex items-center justify-between p-2">
          <h2 className="p-2 flex items-center gap-2 text-[#15b989] bg-green-50 text-xs md:text-sm">
            <IoBookOutline />
            {course?.courseOutput?.["Number of lessons"]} Chapters
          </h2>
          <h2 className="p-2 text-[#15b989] bg-green-50 text-xs md:text-sm">
            {course?.courseOutput?.Difficulty}
          </h2>
        </div>
      </div>
      {displayUser && (
        <div className="flex gap-2 items-center p-2">
          <Image className="rounded-full" src={course?.userProfileImage} alt="user" width={24} height={24} />
          <h2 className="text-xs md:text-sm">{course?.userName}</h2>
        </div>
      )}
    </div>
  );
}

export default CourseCard;
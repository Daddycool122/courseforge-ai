"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/configs/db";
import { eq, and } from "drizzle-orm";
import { Chapters, CourseList } from "@/configs/schema";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";

function CourseStart() {
  const params = useParams();
  const courseId = params?.courseId;

  const [course, setCourse] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapterContent, setChapterContent] = useState(null);

  const fetchCourse = async () => {
    const result = await db.select().from(CourseList).where(eq(CourseList.courseId, courseId));

    if (result?.length) {
      const courseData = result[0];
      setCourse(courseData);

      const firstChapter = courseData.courseOutput.Chapters?.[0];
      if (firstChapter) {
        setSelectedChapter(firstChapter);
        fetchChapterContent(1, courseData.courseId);
      }
    }
  };

  const fetchChapterContent = async (chapterId, courseId) => {
    const result = await db
      .select()
      .from(Chapters)
      .where(and(eq(Chapters.chapterId, chapterId), eq(Chapters.courseId, courseId)));

    if (result?.length) {
      setChapterContent(result[0]);
    }
  };

  useEffect(() => {
    if (courseId) fetchCourse();
  }, [courseId]);

  useEffect(() => {
    console.log("chapterContent:", chapterContent);
  }, [chapterContent]);

  if (!course || !course.courseOutput) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  const courseName = course.courseOutput["Course Name"] || course.courseOutput["Course name"];

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar - Hidden on mobile */}
      <div className="fixed w-full md:w-64 h-auto md:h-screen border-b md:border-r shadow-sm bg-white z-10 hidden md:block">
        <h2 className="bg-[#18cf97] p-2 font-medium text-white text-base md:text-lg">{courseName}</h2>
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
          {course.courseOutput.Chapters?.map((chapter, index) => {
            const isSelected = selectedChapter === chapter;

            return (
              <div
                key={index}
                className={`cursor-pointer hover:bg-green-100 ${isSelected ? "bg-green-100" : ""}`}
                onClick={() => {
                  setSelectedChapter(chapter);
                  fetchChapterContent(index + 1, course.courseId);
                }}
              >
                <ChapterListCard chapter={chapter} index={index} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full md:ml-64 mt-0 md:mt-0">
        {selectedChapter && (
          <div className="p-2 md:p-4 text-lg md:text-xl font-semibold">
            <ChapterContent chapter={selectedChapter} content={chapterContent} />
          </div>
        )}
      </div>

      {/* Optional: Mobile Chapter List Toggle */}
      <div className="md:hidden p-2 bg-white border-t shadow-sm">
        <select
          className="w-full p-2 border rounded-lg"
          value={course.courseOutput.Chapters?.indexOf(selectedChapter) || 0}
          onChange={(e) => {
            const index = parseInt(e.target.value);
            const chapter = course.courseOutput.Chapters[index];
            setSelectedChapter(chapter);
            fetchChapterContent(index + 1, course.courseId);
          }}
        >
          {course.courseOutput.Chapters?.map((chapter, index) => (
            <option key={index} value={index}>
              {chapter["Chapter Name"] || chapter["Chapter name"]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CourseStart;
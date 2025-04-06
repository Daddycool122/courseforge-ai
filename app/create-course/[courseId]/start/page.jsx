"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/configs/db';
import { eq, and } from 'drizzle-orm';
import { Chapters, CourseList } from '@/configs/schema';
import ChapterListCard from './_components/ChapterListCard';
import ChapterContent from './_components/ChapterContent';

function CourseStart() {
  const params = useParams();
  const courseId = params?.courseId;

  const [course, setCourse] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapterContent, setChapterContent] = useState(null);

  const fetchCourse = async () => {
    const result = await db.select().from(CourseList)
      .where(eq(CourseList.courseId, courseId));

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
    const result = await db.select().from(Chapters)
      .where(
        and(
          eq(Chapters.chapterId, chapterId),
          eq(Chapters.courseId, courseId)
        )
      );

    if (result?.length) {
      setChapterContent(result[0]);
    }
  };

  useEffect(() => {
    if (courseId) fetchCourse();
  }, [courseId]);

  // ✅ Add this to log chapterContent whenever it changes
  useEffect(() => {
    console.log('chapterContent:', chapterContent);
  }, [chapterContent]);

  if (!course || !course.courseOutput) {
    return <div>Loading...</div>;
  }

  const courseName = course.courseOutput["Course Name"] || course.courseOutput["Course name"];

  return (
    <div className='flex'>
      <div className='fixed md:w-64 hidden md:block h-screen border-r shadow-sm'>
        <h2 className='bg-[#18cf97] p-2 font-md text-white'>{courseName}</h2>
        <div>
          {course.courseOutput.Chapters?.map((chapter, index) => {
            const chapterName = chapter["Chapter Name"] || chapter["Chapter name"];
            const isSelected = selectedChapter === chapter;

            return (
              <div
                key={index}
                className={`cursor-pointer hover:bg-green-100 ${isSelected ? 'bg-green-100' : ''}`}
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

      <div className='md:ml-64 w-full'>
        {selectedChapter && (
          <div className="p-4 text-xl font-semibold">
            <ChapterContent chapter={selectedChapter} content={chapterContent} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseStart;
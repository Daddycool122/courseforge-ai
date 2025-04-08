"use client";
import { CourseList, Chapters } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq, and } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { db } from "@/configs/db";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetails from "./_components/CourseDetails";
import { Button } from "@/components/ui/button";
import ChapterList from "./_components/ChapterList";
import { GenerateChapterContent_AI } from "@/configs/AiModel";
import LoadingDialog from "../_components/LoadingDialog";
import service from "@/configs/service";
import { useRouter } from "next/navigation";

// 🔧 Helper to safely parse AI's JSON response
function safeParseJSON(jsonString) {
  try {
    const match = jsonString.match(/\[\s*\{[\s\S]*?\}\s*\]/);
    if (!match) throw new Error("No valid JSON array found in response");

    const fixed = match[0]
      .replace(/\\n/g, "")
      .replace(/\\"/g, "'")
      .replace(/“|”/g, '"')
      .replace(/‘|’/g, "'");

    return JSON.parse(fixed);
  } catch (e) {
    console.error("❌ Failed to parse JSON safely:", e);
    return null;
  }
}

function CourseLayout({ params: paramsPromise }) {
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const params = React.use(paramsPromise); // Unwrap promise params
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (params?.courseId && user?.primaryEmailAddress?.emailAddress) {
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

      if (result.length > 0) {
        setCourse(result[0]);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const GenerateChapterContent = async () => {
    setLoading(true);
    const chapters = course?.courseOutput?.Chapters || [];

    try {
      for (const [index, chapter] of chapters.entries()) {
        const chapterName = chapter["Chapter name"] || chapter["Chapter Name"];
        const prompt = `
ONLY return a valid JSON array of objects, no explanation or intro text.
Each object must include:
- "title": string
- "explanation": string
- "codeExample": string (wrap code in <precode>...</precode>)

Explain Chapter "${chapterName}" of Course "${course?.name}" in detail.
        `.trim();

        console.log("📥 Prompt:\n", prompt);

        try {
          const videoResp = await service.getVideos(`${course?.name} ${chapterName}`);
          const videoId = videoResp[0]?.id?.videoId || "";

          const result = await GenerateChapterContent_AI.sendMessage(prompt);
          const rawText = await result?.response?.text();

          console.log(`📤 Raw AI Response for Chapter ${index + 1}:\n`, rawText);

          const content = safeParseJSON(rawText);
          if (!content) throw new Error("Parsed content is null or invalid.");

          await db.insert(Chapters).values({
            chapterId: index + 1,
            courseId: course?.courseId,
            content: content,
            videoId: videoId,
          });

        } catch (error) {
          console.error(`❌ Error generating content for chapter ${index + 1}:`, error);
        }
      }

      await db.update(CourseList)
        .set({ publish: true })
        .where(eq(CourseList.courseId, course?.courseId));

      router.replace(`/create-course/${course?.courseId}/finish`);

    } catch (error) {
      console.error("❌ Error in GenerateChapterContent:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-3xl">Course Layout</h2>
      <LoadingDialog loading={loading} />

      <CourseBasicInfo course={course} refreshData={() => GetCourse()} />
      <CourseDetails course={course} />
      <ChapterList course={course} refreshData={() => GetCourse()} />

      <Button className="my-10 ml-8" onClick={GenerateChapterContent}>
        Generate Content
      </Button>
    </div>
  );
}

export default CourseLayout;

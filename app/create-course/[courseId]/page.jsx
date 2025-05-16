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
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { FaRocket, FaCheckCircle } from "react-icons/fa";

function safeParseJSON(jsonString) {
  try {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.log("Direct parsing failed, trying to extract JSON...");
    }

    let match = jsonString.match(/(\[[\s\S]*\])/);
    if (match) {
      const extracted = match[1].trim();
      return JSON.parse(extracted);
    }
    
    match = jsonString.match(/(\{[\s\S]*\})/);
    if (match) {
      const extracted = match[1].trim();
      return JSON.parse(extracted);
    }
    
    const cleaned = jsonString
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .replace(/\\n/g, '')
      .replace(/\\"/g, '"')
      .replace(/"|"/g, '"')
      .replace(/'|'/g, "'")
      .trim();
      
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("❌ Failed to parse JSON safely:", e);
    console.error("Problem with string:", jsonString);
    
    try {
      const openBracketPos = jsonString.indexOf('[');
      const closeBracketPos = jsonString.lastIndexOf(']');
      
      if (openBracketPos !== -1 && closeBracketPos !== -1 && openBracketPos < closeBracketPos) {
        const jsonSubstring = jsonString.substring(openBracketPos, closeBracketPos + 1);
        return JSON.parse(jsonSubstring);
      }
    } catch (fallbackError) {
      console.error("Fallback extraction also failed:", fallbackError);
    }
    
    return null;
  }
}

function CourseLayout({ params: paramsPromise }) {
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const params = React.use(paramsPromise); 
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatingChapter, setGeneratingChapter] = useState("");
  const [completedChapters, setCompletedChapters] = useState([]); 

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

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Left side
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      
      // Right side
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const GenerateChapterContent = async () => {
    setLoading(true);
    const chapters = course?.courseOutput?.Chapters || [];
    setCompletedChapters([]);

    try {
      for (const [index, chapter] of chapters.entries()) {
        const chapterName = chapter["Chapter name"] || chapter["Chapter Name"];
        setGeneratingChapter(chapterName);
        setGenerationProgress(((index) / chapters.length) * 100);

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

          setCompletedChapters(prev => [...prev, chapterName]);
          setGenerationProgress(((index + 1) / chapters.length) * 100);

        } catch (error) {
          console.error(`❌ Error generating content for chapter ${index + 1}:`, error);
        }
      }

      await db.update(CourseList)
        .set({ publish: true })
        .where(eq(CourseList.courseId, course?.courseId));

      setGenerationProgress(100);
      triggerConfetti();
      
      setTimeout(() => {
        router.replace(`/create-course/${course?.courseId}/finish`);
      }, 3000);

    } catch (error) {
      console.error("❌ Error in GenerateChapterContent:", error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-4 bg-white rounded-lg shadow-lg flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-4 border-t-[#15b989] border-gray-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading your course...</p>
        </div>
      </div>
    );
  }

  // Add this block to define courseName
  const courseName =
    course.courseOutput?.["Course Name"] ||
    course.courseOutput?.["Course name"] ||
    course.name ||
    "";

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-6 px-2 sm:px-4 md:px-8 lg:px-16 mt-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="max-w-6xl mx-auto w-full"
        variants={itemVariants}
      >
        <motion.div className="text-center mb-8 sm:mb-10" variants={itemVariants}>
          <div className="relative inline-block">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-[#15b989]">Course Layout</h2>
            <motion.div 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#15b989] h-1 w-0"
              animate={{ width: "80%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </div>
          <p className="text-gray-600 mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            Review your course structure and generate detailed content for each chapter.
          </p>
        </motion.div>

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 sm:p-8 rounded-xl shadow-2xl max-w-xs sm:max-w-md w-full mx-2">
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto border-4 border-t-4 border-t-[#15b989] border-gray-200 rounded-full animate-spin"></div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Generating Course Content</h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  {generatingChapter ? `Currently working on: "${generatingChapter}"` : "Preparing your course content..."}
                </p>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 mb-4">
                  <motion.div 
                    className="bg-[#15b989] h-3 sm:h-4 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${generationProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-xs sm:text-sm text-gray-500">
                  {generationProgress.toFixed(0)}% complete
                </p>

                {/* Completed chapters */}
                {completedChapters.length > 0 && (
                  <div className="mt-4 text-left border-t pt-4 max-h-32 sm:max-h-40 overflow-y-auto">
                    <h4 className="font-medium mb-2 text-xs sm:text-sm">Completed Chapters:</h4>
                    <div>
                      {completedChapters.map((chapter, index) => (
                        <div key={index} className="flex items-center text-xs sm:text-sm text-gray-600 mb-1">
                          <FaCheckCircle className="text-green-500 mr-2" />
                          <span>{chapter}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Content Sections */}
        <div className="space-y-6 sm:space-y-8">
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6 overflow-hidden relative"
            variants={itemVariants}
          >
            <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-gradient-to-br from-green-50 to-teal-100 rounded-bl-full opacity-50 -z-10" />
            <div className="flex items-center justify-between gap-1 sm:gap-2">
              <h3 className="font-semibold text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-800 truncate max-w-[8rem] sm:max-w-md md:max-w-lg">
                {courseName}
              </h3>
              {/* Edit button here */}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 border-b pb-2">Course Information</h3>
            <CourseBasicInfo course={course} refreshData={() => GetCourse()} />
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6 overflow-hidden relative"
            variants={itemVariants}
          >
            <div className="absolute bottom-0 left-0 w-24 sm:w-48 h-24 sm:h-48 bg-gradient-to-tr from-green-50 to-teal-100 rounded-tr-full opacity-50 -z-10" />
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 border-b pb-2">Course Details</h3>
            <CourseDetails course={course} />
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6 overflow-x-auto"
            variants={itemVariants}
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 border-b pb-2">Chapter List</h3>
            <ChapterList course={course} refreshData={() => GetCourse()} />
          </motion.div>

          <motion.div 
            className="flex justify-center mt-6 sm:mt-8"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className="py-4 sm:py-6 px-6 sm:px-8 rounded-lg text-base sm:text-lg font-medium shadow-lg transition-all duration-300 bg-gradient-to-r from-[#15b989] to-[#0e9d74] text-white hover:from-[#129e74] hover:to-[#0d8c66] flex items-center space-x-3"
                onClick={GenerateChapterContent}
              >
                <FaRocket className="mr-2" size={18} />
                <span>Generate Course Content</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default CourseLayout;
"use client"
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { db } from '@/configs/db';
import { and } from 'drizzle-orm';
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetails from './_components/CourseDetails';
import { Button } from '@/components/ui/button';
import ChapterList from './_components/ChapterList';
import { GenerateChapterContent_AI } from '@/configs/AiModel';
import LoadingDialog from '../_components/LoadingDialog';
import service from '@/configs/service';
import { useRouter } from 'next/navigation';
import { Chapters } from '@/configs/schema';



function CourseLayout({ params: paramsPromise }) {  // Rename to avoid confusion
  const { user } = useUser();
  const [course,setCourse] = useState([])
  const params = React.use(paramsPromise);  // Unwrap the Promise here
  const [loading, setLoading] = useState(false);
  const router =  useRouter();
  
  useEffect(() => {
    if (params && user) {  // Check for both params and user
      GetCourse();
    }
  }, [params?.courseId, user?.primaryEmailAddress?.emailAddress]);  // Use specific values

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
      console.error('Error fetching course:', error);
    }
  };

  const GenerateChapterContent = async () => {
    setLoading(true);
    const chapters = course?.courseOutput?.Chapters;
    chapters.forEach(async(chapter,index) => {
      const PROMPT = `Explain the concept in Detail on Topic: ${course?.name}, Chapter ${chapter["Chapter name"]?chapter["Chapter name"]:chapter["Chapter Name"]}, in JSON Format with list of array with field as title , explaination on given chapter in detail, Code Example (Code field in <precode> format) if applicable`
      console.log(PROMPT);
     //if(index < 2){
        try{

          let videoId = '';



          //Generate Video Content
          service.getVideos(`${course?.name} ${chapter["Chapter name"]?chapter["Chapter name"]:chapter["Chapter Name"]}`).then((resp)=>{
            console.log(resp);
            videoId=resp[0]?.id?.videoId;
            
          })

          //Generate Chapter Content
          const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
          console.log(result?.response?.text());
          const content = JSON.parse(result?.response?.text());

          
          //Save Chapter Content + Video URL
           await db.insert(Chapters).values({
            chapterId:index+1,
            courseId:course?.courseId,
            content:content,
            videoId:videoId,
           })

          setLoading(false);
          
        }
        catch(e){
          setLoading(false);
          console.log(e);
          
        }
        await db.update(CourseList).set({publish:true})
        router.replace('/create-course/'+course?.courseId+"/finish");
      
   //}
  
  });
  }

  return (
    <div className='mt-10 px-7 md:px-20 lg:px-44'>
      <h2  className='font-bold text-center text-3xl'>Course Layout</h2>
      <LoadingDialog loading={loading}/>

      {/* Basic Info */}
      <CourseBasicInfo course={course} refreshData={()=>GetCourse()}/>
      {/* Course Detail */}
      <CourseDetails course={course}  />
      {/* List of Lessons */}
      <ChapterList course={course} refreshData={()=>GetCourse()}/>

      <Button className="my-10 ml-8" onClick={GenerateChapterContent}>Generate Content</Button>

    </div>
  );
}

export default CourseLayout;
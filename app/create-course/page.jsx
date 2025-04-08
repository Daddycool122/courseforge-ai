"use client"
import React, { useEffect ,useContext} from 'react'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserInputContext } from '../_context/UserInputContext';
import { HiMiniSquaresPlus, HiOutlineBookOpen, HiOutlineGlobeEuropeAfrica } from "react-icons/hi2";
import SelectCategory from './_components/SelectCategory';
import TopicDescription from './_components/TopicDescription';
import SelectOptions from './_components/SelectOptions';
import { GenerateCourseLayout_AI } from '@/configs/AiModel';
import LoadingDialog from './_components/LoadingDialog';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import uuid4 from "uuid4";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';






const CreateCourse = () => {
    const router = useRouter();
    const StepperOptions = [{
        id: 1,
        name: "Category",
        icon: <HiMiniSquaresPlus className='h-4 w-4 ' />,
    },
    {
        id: 2,
        name: "Topic & Description",
        icon: <HiOutlineBookOpen className='h-4 w-4 ' />,
    },
    {
        id: 3,
        name: "Options",
        icon: <HiOutlineGlobeEuropeAfrica className='h-4 w-4 ' />,
    },
    ]
    const [loading, setLoading] = useState(false);
    const {userCourseInput,setUserCourseInput} = useContext(UserInputContext);
    const [activeStep, setActiveStep] = useState(0);
    const checkStatus = ()=>{
        if(userCourseInput.length==0){
            return true;
        }
        if(activeStep==0 && (userCourseInput?.category?.length==0 || userCourseInput?.category==undefined) ) {
            return true;
        }
        if(activeStep==1 &&(userCourseInput?.Topic?.length==0 || userCourseInput?.Topic==undefined)){
            return true;
        }
        if(activeStep==2 &&(userCourseInput?.Difficulty?.length==0 || userCourseInput?.Difficulty==undefined)){
            return true;
        }
        if(activeStep==2 &&(userCourseInput?.Video?.length==0 || userCourseInput?.Video==undefined)){
            return true;
        }
        if(activeStep==2 &&(userCourseInput?.Duration?.length==0 || userCourseInput?.Duration==undefined)){
            return true;
        }
        if(activeStep==2 &&(userCourseInput?.No_of_lessons?.length==0 || userCourseInput?.No_of_lessons==undefined)){
            return true;
        }
        return false
    }
    const {user}=useUser()
    const GenerateCourseLayout = async () => {
        setLoading(true);
        const BASIC_PROMPT = `
        ONLY return a valid JSON object. Do NOT include any introduction, explanation, or code block markers (like \`\`\`). 
        The JSON must be structured like:
        
        {
          "Course name": "string",
          "Category": "string",
          "Topic": "string",
          "Difficulty": "string",
          "Total Duration": "string",
          "Number of lessons": "number",
          "Description": "string",
          "Chapters": [
            {
              "Chapter Name": "string",
              "About": "string",
              "Duration": "string"
            }
          ]
        }
        `;
              
        const USER_INPUT_PROMPT = `Category: ${userCourseInput?.category}, Topic: ${userCourseInput?.Topic}, Difficulty: ${userCourseInput?.Difficulty}, Duration: ${userCourseInput?.Duration}, Number of lessons: ${userCourseInput?.No_of_lessons}`;
        const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
      
        try {
          const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
          const rawText = result?.response?.text();
          console.log("RAW AI RESPONSE >>>", rawText);
      
          const firstBrace = rawText.indexOf("{");
          const lastBrace = rawText.lastIndexOf("}");
          const jsonSubstring = rawText.substring(firstBrace, lastBrace + 1);
      
          const parsed = JSON.parse(jsonSubstring);
          console.log("PARSED JSON >>>", parsed);
      
          SaveCourseLayoutInDB(parsed);
        } catch (err) {
          console.error("❌ Failed to parse AI response as JSON:", err);
          alert("Oops! The AI response wasn't valid JSON. Please retry or modify the input.");
        } finally {
          setLoading(false);
        }
      };
      

    const SaveCourseLayoutInDB=async (courseLayout)=>{
        var id = uuid4();
        setLoading(true);
        const result = await db.insert(CourseList).values({
            courseId:id,
            name:userCourseInput?.Topic,
            difficulty:userCourseInput?.Difficulty,
            includeVideo:userCourseInput?.Video,
            category:userCourseInput?.category,
            courseOutput:courseLayout,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            userName:user?.fullName,
            userProfileImage:user.imageUrl
        })

        console.log("finish");
        setLoading(false);
        router.replace(`/create-course/${id}`)
        
        
    }

    useEffect(() => {
    
        console.log("UserCourseInput", userCourseInput);
        
    }, [userCourseInput]);
    
    return (
        <div>
            {/* Stepper */}
            <div className='flex flex-col items-center justify-center py-10'>
                <h2 className='text-4xl text-[#15b989] font-medium'>Create Course</h2>
                <div className='flex mt-10'>
                    {StepperOptions.map((item, index) => (
                        <div className='flex items-center' key={index}>
                            <div className='flex flex-col items-center justify-center w-[130px] md:w-[130px]'>
                                <div className={activeStep >= index ? 'bg-[#15b989] p-3 rounded-full text-white' : 'bg-gray-300 p-3 rounded-full text-white'}>
                                    {item.icon}
                                </div>
                                <h2 className='hidden md:block md:text-sm'>{item.name}</h2>
                            </div>
                            {index != StepperOptions.length - 1 && <div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] ${activeStep > index ? 'bg-[#15b989]' : 'bg-gray-300'}`}></div>}
                        </div>
                    ))}
                </div>
            </div>
            {/* Component */}

                {activeStep==0?<SelectCategory/>:
                activeStep==1?<TopicDescription/>:
                activeStep==2?<SelectOptions/>:null}
            {/* Next Prev Button */}

            <div className="flex  px-40 justify-between mt-4">
                <Button 
                    onClick={() => setActiveStep(activeStep - 1)} 
                    className="bg-gray-300 text-gray-700 hover:bg-gray-400"
                    disabled={activeStep === 0}
                    variant={"outline"}
                >
                    Previous
                </Button>
                {activeStep<2 && <Button 
                    disabled={checkStatus()}
                    onClick={() => setActiveStep(activeStep + 1)} 
                    className="bg-[#15b989] hover:bg-[#129e74]"
                    
                >
                    Next
                </Button>}
                {activeStep==2 && <Button onClick={GenerateCourseLayout} disabled={checkStatus()} className="bg-[#129e74] hover:bg-[#129e74]">Generate Course Layout</Button>}
            </div>
            {loading==true && <LoadingDialog loading={loading} />}
        </div>
    )
}

export default CreateCourse
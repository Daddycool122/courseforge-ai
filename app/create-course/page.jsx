"use client"
import React, { useEffect, useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button';
import { UserInputContext } from '../_context/UserInputContext';
import { HiMiniSquaresPlus, HiOutlineBookOpen, HiOutlineGlobeEuropeAfrica } from "react-icons/hi2";
import { FaRocket } from "react-icons/fa";
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
import confetti from 'canvas-confetti';

const CreateCourse = () => {
    const router = useRouter();
    const StepperOptions = [
        {
            id: 1,
            name: "Category",
            icon: <HiMiniSquaresPlus className='h-5 w-5' />,
            description: "Choose the perfect category for your course"
        },
        {
            id: 2,
            name: "Topic & Description",
            icon: <HiOutlineBookOpen className='h-5 w-5' />,
            description: "Define what you'll teach and why it matters"
        },
        {
            id: 3,
            name: "Options",
            icon: <HiOutlineGlobeEuropeAfrica className='h-5 w-5' />,
            description: "Customize your course structure and content"
        },
    ]
    
    const [loading, setLoading] = useState(false);
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
    const [activeStep, setActiveStep] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    
    const checkStatus = () => {
        if (userCourseInput.length == 0) {
            return true;
        }
        if (activeStep == 0 && (userCourseInput?.category?.length == 0 || userCourseInput?.category == undefined)) {
            return true;
        }
        if (activeStep == 1 && (userCourseInput?.Topic?.length == 0 || userCourseInput?.Topic == undefined)) {
            return true;
        }
        if (activeStep == 2 && (userCourseInput?.Difficulty?.length == 0 || userCourseInput?.Difficulty == undefined)) {
            return true;
        }
        if (activeStep == 2 && (userCourseInput?.Video?.length == 0 || userCourseInput?.Video == undefined)) {
            return true;
        }
        if (activeStep == 2 && (userCourseInput?.Duration?.length == 0 || userCourseInput?.Duration == undefined)) {
            return true;
        }
        if (activeStep == 2 && (userCourseInput?.No_of_lessons?.length == 0 || userCourseInput?.No_of_lessons == undefined)) {
            return true;
        }
        return false
    }
    
    const { user } = useUser()
    
    const triggerConfetti = () => {
        setShowConfetti(true);
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        
        setTimeout(() => {
            setShowConfetti(false);
        }, 3000);
    }
    
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
            
            triggerConfetti();
            SaveCourseLayoutInDB(parsed);
        } catch (err) {
            console.error("❌ Failed to parse AI response as JSON:", err);
            alert("Oops! The AI response wasn't valid JSON. Please retry or modify the input.");
        } finally {
            setLoading(false);
        }
    };
      
    const SaveCourseLayoutInDB = async (courseLayout) => {
        var id = uuid4();
        setLoading(true);
        const result = await db.insert(CourseList).values({
            courseId: id,
            name: userCourseInput?.Topic,
            difficulty: userCourseInput?.Difficulty,
            includeVideo: userCourseInput?.Video,
            category: userCourseInput?.category,
            courseOutput: courseLayout,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userProfileImage: user.imageUrl
        })

        console.log("finish");
        setLoading(false);
        router.replace(`/create-course/${id}`)
    }

    useEffect(() => {
        console.log("UserCourseInput", userCourseInput);
    }, [userCourseInput]);
    
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

    return (
        <motion.div 
            className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-4 md:px-8 lg:px-16 py-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div 
                className='flex flex-col items-center justify-center py-10'
                variants={itemVariants}
            >
                <div className="relative mb-6">
                    <h2 className='text-5xl text-[#15b989] font-bold'>Create Course</h2>
                    <motion.div 
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#15b989] h-1 w-0"
                        animate={{ width: "80%" }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    />
                </div>
                <p className="text-gray-600 text-lg max-w-2xl text-center mb-10">
                    Design your perfect learning experience with our AI-powered course creator. Follow these steps to build an engaging and effective course.
                </p>
            </motion.div>

            <motion.div 
                className='flex flex-col items-center justify-center mb-12'
                variants={itemVariants}
            >
                <div className='flex flex-wrap justify-center'>
                    {StepperOptions.map((item, index) => (
                        <div className='flex items-center my-2' key={index}>
                            <motion.div 
                                className='flex flex-col items-center justify-center w-[150px] md:w-[180px]'
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    if (index < activeStep) {
                                        setActiveStep(index);
                                    }
                                }}
                            >
                                <motion.div 
                                    className={`flex flex-col items-center justify-center p-4 rounded-full cursor-pointer transition-all duration-300 ${
                                        activeStep >= index 
                                            ? 'bg-[#15b989] text-white shadow-lg shadow-green-200' 
                                            : 'bg-gray-200 text-gray-500 border-2 border-gray-300'
                                    }`}
                                    animate={activeStep >= index ? { scale: [1, 1.2, 1] } : {}}
                                    transition={{ duration: 0.5, times: [0, 0.5, 1] }}
                                >
                                    {item.icon}
                                    <span className="mt-1 font-medium">{item.id}</span>
                                </motion.div>
                                <h2 className='mt-2 font-semibold text-center'>{item.name}</h2>
                                <p className="text-xs text-gray-500 text-center mt-1">{item.description}</p>
                            </motion.div>
                            {index !== StepperOptions.length - 1 && (
                                <div className="flex items-center">
                                    <motion.div 
                                        className={`h-1 hidden md:block w-[80px] md:w-[120px] lg:w-[150px] rounded-full ${activeStep > index ? 'bg-[#15b989]' : 'bg-gray-300'}`}
                                        animate={activeStep > index ? { 
                                            background: ['#15b989', '#0ead7a', '#15b989'],
                                            boxShadow: ['0 0 0px #15b989', '0 0 8px #15b989', '0 0 0px #15b989'],
                                        } : {}}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>

            
            <motion.div 
                className="w-full bg-gray-200 rounded-full h-2 mb-8 max-w-3xl mx-auto"
                variants={itemVariants}
            >
                <motion.div 
                    className="bg-[#15b989] h-2 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((activeStep + 1) / StepperOptions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </motion.div>

            
            <motion.div 
    className="bg-white rounded-2xl p-8 shadow-xl mb-12 relative overflow-hidden"
    variants={itemVariants}
    style={{ maxWidth: "1200px", margin: "0 auto" }}
>
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-50 to-teal-100 rounded-bl-full opacity-50 -z-10" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-green-50 to-teal-100 rounded-tr-full opacity-50 -z-10" />
                
                
                <motion.div
    key={activeStep}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
>
    {activeStep == 0 ? <SelectCategory /> :
     activeStep == 1 ? <TopicDescription /> :
     activeStep == 2 ? <SelectOptions /> : null}
</motion.div>
            </motion.div>

            <motion.div 
                className="flex justify-between max-w-3xl mt-4 mx-auto px-4 md:px-8"
                variants={itemVariants}
            >
                <Button 
                    onClick={() => setActiveStep(activeStep - 1)} 
                    className={`px-6 py-2 rounded-lg text-base font-medium shadow-lg transition-all duration-300 ${
                        activeStep === 0 
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 hover:border-gray-400'
                    }`}
                    disabled={activeStep === 0}
                    variant="outline"
                >
                    <span className="mr-2">←</span>
                    Previous
                </Button>
                
                {activeStep < 2 && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                            disabled={checkStatus()}
                            onClick={() => setActiveStep(activeStep + 1)} 
                            className={`px-6 py-2 rounded-lg text-base font-medium shadow-lg transition-all duration-300 ${
                                checkStatus() 
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                    : 'bg-[#15b989] text-white hover:bg-[#129e74]'
                            }`}
                        >
                            Next
                            <span className="ml-2">→</span>
                        </Button>
                    </motion.div>
                )}
                
                {activeStep == 2 && (
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button 
                            onClick={GenerateCourseLayout} 
                            disabled={checkStatus()} 
                            className={`px-6 py-2 rounded-lg text-base font-medium shadow-lg transition-all duration-300 flex items-center ${
                                checkStatus() 
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-[#15b989] to-[#0e9d74] text-white hover:from-[#129e74] hover:to-[#0d8c66]'
                            }`}
                        >
                            <FaRocket className="mr-2" />
                            Generate Course Layout
                        </Button>
                    </motion.div>
                )}
            </motion.div>
            
            <motion.div 
                className="flex justify-center mt-12"
                variants={itemVariants}
            >
                {StepperOptions.map((_, index) => (
                    <div 
                        key={index}
                        className={`h-2 w-2 mx-1 rounded-full ${
                            activeStep === index ? 'bg-[#15b989]' : 'bg-gray-300'
                        }`}
                    />
                ))}
            </motion.div>
            
            {loading && <LoadingDialog loading={loading} />}
        </motion.div>
    )
}

export default CreateCourse
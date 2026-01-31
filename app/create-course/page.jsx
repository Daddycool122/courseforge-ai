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
        // Keep loading active during navigation - will be cleared when component unmounts
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
            className="min-h-screen pt-20 md:pt-24 bg-gradient-to-br from-gray-50 via-white to-green-50/30"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Header Section */}
            <motion.div 
                className="text-center pt-8 pb-6 px-4 sm:px-6 lg:px-8"
                variants={itemVariants}
            >
                <div className="relative inline-block mb-6">
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl text-[#15b989] font-extrabold tracking-tight'>Create Course</h2>
                    <motion.div 
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#15b989] to-[#0ead7a] h-1 w-0 rounded-full"
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    />
                </div>
                <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-8">
                    Design your perfect learning experience with our AI-powered course creator. Follow these steps to build an engaging and effective course tailored to your needs.
                </p>
            </motion.div>

            {/* Progress Steps */}
            <motion.div 
                className='flex flex-col items-center justify-center mb-8 px-4 sm:px-6'
                variants={itemVariants}
            >
                <div className='flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-4'>
                    {StepperOptions.map((item, index) => (
                        <div className='flex flex-col md:flex-row items-center' key={index}>
                            <motion.div 
                                className='flex flex-col items-center justify-center w-full md:w-[200px] lg:w-[220px]'
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    if (index < activeStep) {
                                        setActiveStep(index);
                                    }
                                }}
                            >
                                <motion.div 
                                    className={`flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-500 shadow-lg mb-3 ${
                                        activeStep >= index 
                                            ? 'bg-gradient-to-br from-[#15b989] to-[#0ead7a] text-white shadow-green-200 shadow-xl' 
                                            : 'bg-white text-gray-500 border-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                                    }`}
                                    animate={activeStep >= index ? { 
                                        scale: [1, 1.05, 1],
                                        boxShadow: ["0 4px 20px rgba(21, 185, 137, 0.2)", "0 8px 30px rgba(21, 185, 137, 0.4)", "0 4px 20px rgba(21, 185, 137, 0.2)"]
                                    } : {}}
                                    transition={{ duration: 0.6, times: [0, 0.5, 1] }}
                                >
                                    <div className="mb-2">
                                        {item.icon}
                                    </div>
                                    <span className="text-xl font-bold">{item.id}</span>
                                </motion.div>
                                <div className="text-center max-w-[200px]">
                                    <h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-1'>{item.name}</h3>
                                    <p className="text-xs sm:text-sm text-gray-500 leading-tight">{item.description}</p>
                                </div>
                            </motion.div>
                            {index !== StepperOptions.length - 1 && (
                                <div className="flex items-center justify-center my-4 md:my-0 md:mx-4">
                                    <motion.div 
                                        className={`h-1 w-16 md:w-20 lg:w-24 rounded-full transition-all duration-500 ${
                                            activeStep > index 
                                                ? 'bg-gradient-to-r from-[#15b989] to-[#0ead7a] shadow-lg' 
                                                : 'bg-gray-200'
                                        }`}
                                        animate={activeStep > index ? { 
                                            opacity: [0.7, 1, 0.7],
                                        } : {}}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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

            {/* Main Content Card */}
            <motion.div 
                className="max-w-6xl mx-auto px-4 sm:px-6"
                variants={itemVariants}
            >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-white/50 relative overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 w-40 sm:w-64 h-40 sm:h-64 bg-gradient-to-br from-green-100/60 to-emerald-100/60 rounded-bl-full opacity-40 -z-10" />
                    <div className="absolute bottom-0 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-tr from-teal-100/60 to-green-100/60 rounded-tr-full opacity-40 -z-10" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-50/30 to-emerald-50/30 rounded-full blur-3xl -z-10" />
                    
                    <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="relative z-10"
                    >
                        {activeStep == 0 ? <SelectCategory /> :
                         activeStep == 1 ? <TopicDescription /> :
                         activeStep == 2 ? <SelectOptions /> : null}
                    </motion.div>
                </div>
            </motion.div>

            {/* Navigation Buttons */}
            <motion.div 
                className="flex flex-col sm:flex-row justify-between items-center gap-4 max-w-4xl mx-auto mt-8 px-4 sm:px-6"
                variants={itemVariants}
            >
                <Button 
                    onClick={() => setActiveStep(activeStep - 1)} 
                    className={`order-2 sm:order-1 w-full sm:w-auto px-8 py-3 rounded-xl text-base font-semibold shadow-lg transition-all duration-300 ${
                        activeStep === 0 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-sm' 
                            : 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-xl transform hover:scale-105'
                    }`}
                    disabled={activeStep === 0}
                    variant="outline"
                >
                    <span className="mr-2">←</span>
                    Previous
                </Button>
                
                <div className="order-1 sm:order-2 flex justify-center">
                    <div className="flex space-x-3">
                        {StepperOptions.map((_, index) => (
                            <motion.div 
                                key={index}
                                className={`h-2 w-8 rounded-full transition-all duration-300 ${
                                    activeStep === index 
                                        ? 'bg-gradient-to-r from-[#15b989] to-[#0ead7a] shadow-lg' 
                                        : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                                whileHover={{ scale: 1.1 }}
                                animate={activeStep === index ? { scale: [1, 1.1, 1] } : {}}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        ))}
                    </div>
                </div>
                
                {activeStep < 2 && (
                    <motion.div 
                        className="order-3 w-full sm:w-auto"
                        whileHover={{ scale: 1.02 }} 
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button 
                            disabled={checkStatus()}
                            onClick={() => setActiveStep(activeStep + 1)} 
                            className={`w-full sm:w-auto px-8 py-3 rounded-xl text-base font-semibold shadow-lg transition-all duration-300 ${
                                checkStatus() 
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-sm' 
                                    : 'bg-gradient-to-r from-[#15b989] to-[#0ead7a] text-white hover:from-[#0ead7a] hover:to-[#129e74] shadow-xl hover:shadow-2xl transform hover:scale-105'
                            }`}
                        >
                            Next
                            <span className="ml-2">→</span>
                        </Button>
                    </motion.div>
                )}
                
                {activeStep == 2 && (
                    <motion.div 
                        className="order-3 w-full sm:w-auto"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button 
                            onClick={GenerateCourseLayout} 
                            disabled={checkStatus()} 
                            className={`w-full sm:w-auto px-8 py-3 rounded-xl text-base font-semibold shadow-lg transition-all duration-300 flex items-center justify-center ${
                                checkStatus() 
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-sm' 
                                    : 'bg-gradient-to-r from-[#15b989] via-[#0ead7a] to-[#129e74] text-white hover:from-[#0ead7a] hover:via-[#129e74] hover:to-[#0d8c66] shadow-xl hover:shadow-2xl transform hover:scale-105'
                            }`}
                        >
                            <FaRocket className="mr-2" />
                            Generate Course Layout
                        </Button>
                    </motion.div>
                )}
            </motion.div>
            
            {loading && <LoadingDialog loading={loading} />}
        </motion.div>
    )
}

export default CreateCourse
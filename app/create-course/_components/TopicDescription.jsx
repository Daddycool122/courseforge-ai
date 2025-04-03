import React from 'react'
import CategoryList from '@/app/_shared/CategoryList'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { UserInputContext } from '@/app/_context/UserInputContext'
import { useContext } from 'react'

function TopicDescription() {
    
    
        const {userCourseInput,setUserCourseInput} = useContext(UserInputContext);
    
    const handleInputChange= (fieldName, value) => {
            setUserCourseInput((prev)=>({
                ...prev,
                [fieldName]: value
            }))
    }
  return (
    <div className='px-24 mx-20 lg:mx-44 '>
        {/*Input Topic */}
        <div>
            <label className=''>💡Write the topic for which you want to generate the course (e.g., Python Course Yoga , etc.): </label>
            <Input onChange={(e)=>handleInputChange('Topic',e.target.value)} className="my-2" placeholder = {'Topic'} defaultValue={userCourseInput?.Topic}/>
        </div>
        <div>
            <label className=''>📝Write a brief description of the topic: </label>
            <Textarea onChange={(e)=>handleInputChange('Description',e.target.value)} className="my-2" placeholder = {'Description'} defaultValue={userCourseInput?.Description}/>
        </div>
        {/*Textarea Desc*/}
    </div>
  )
}

export default TopicDescription
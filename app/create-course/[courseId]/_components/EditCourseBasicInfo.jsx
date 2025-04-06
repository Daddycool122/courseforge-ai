import React, { useEffect, useState } from 'react'
import { eq } from 'drizzle-orm';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogClose,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { FaRegEdit } from "react-icons/fa";
 import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';


function EditCourseBasicInfo({course,refreshData}) {

    const [name,setName] = useState()
    const [description,setDescription] = useState()

    const onUpdateHandler = async()=>{
        course.courseOutput["Course name"]= name;
        course.courseOutput.Description= description;
        // console.log(course);
        const result = await db.update(CourseList).set({
            courseOutput: course?.courseOutput,
        }).where(eq(CourseList.id,course?.id))
        .returning({id: CourseList.id})
        refreshData(true)
        // console.log(result);
        
        
    }

    useEffect(()=>{
        setName(course?.courseOutput?.["Course name"])
        setDescription(course?.courseOutput?.Description)
    },[course])
  return (
    <div>
  

  <Dialog>
  <DialogTrigger><FaRegEdit/></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Course Title & Description</DialogTitle>
      <DialogDescription>
        <div className='mt-3'>
            <label className='text-black'>Course Title</label>
            <Input onChange={(e)=>{setName(e.target.value)}} className="mt-2" defaultValue={course?.courseOutput?.["Course name"]} type={'text'}/>

        </div>
        <div className='mt-3'>
            <label className='text-black' >Description</label>
            <Textarea onChange={(e)=>{setDescription(e.target.value)}}  className="mt-2 h-40" type={'text'} defaultValue={course?.courseOutput?.Description}/>

        </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
    <DialogClose>
            <Button onClick={onUpdateHandler} className="bg-[#18cf97]">Update</Button>
        </DialogClose>
    </DialogFooter>
        
    
  </DialogContent>
</Dialog>


    </div>
  )
}

export default EditCourseBasicInfo
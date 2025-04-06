import React from 'react'
import { useState } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { db} from '@/configs/db';
import { eq } from 'drizzle-orm';
import { CourseList } from '@/configs/schema';
import { useEffect } from 'react';
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

function EditChapters({course,index,refreshData}) {

    const chapters = course?.courseOutput?.Chapters
    
    const [name,setName] = useState()
    const [about,setAbout] = useState()

    const onUpdateHandler = async()=>{
            course.courseOutput.Chapters[index]["Chapter name"]= name;
            course.courseOutput.Chapters[index]["About"]= about;
            console.log(course);
            const result = await db.update(CourseList).set({
                courseOutput: course?.courseOutput,
            }).where(eq(CourseList.id,course?.id))
            .returning({id: CourseList.id})
            refreshData(true)
            // console.log(result);
            
            
        }

        useEffect(()=>{
                setName(chapters[index]["Chapter name"])
                setAbout(chapters[index].About)
            },[course])

  return (
    
        <Dialog>
  <DialogTrigger><FaRegEdit/></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Chapter</DialogTitle>
      <DialogDescription>
      <div className='mt-3'>
            <label className='text-black'>Chapter name</label>
            <Input onChange={(e)=>{setName(e.target.value)}} className="mt-2" defaultValue={chapters[index]["Chapter name"]} type={'text'}/>

        </div>
        <div className='mt-3'>
            <label className='text-black' >About</label>
            <Textarea onChange={(e)=>{setAbout(e.target.value)}}  className="mt-2 h-40" type={'text'} defaultValue={chapters[index]["About"]}/>

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

   
  )
}

export default EditChapters
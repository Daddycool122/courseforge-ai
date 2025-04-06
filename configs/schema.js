import { boolean } from "drizzle-orm/gel-core";
import { pgTable ,serial,integer ,varchar,json } from "drizzle-orm/pg-core";

export const CourseList = pgTable("CourseList",{
    id:serial('id').primaryKey(),
    courseId:varchar('courseId').notNull(),
    name:varchar('name').notNull(),
    category:varchar('category').notNull(),
    difficulty:varchar('difficulty').notNull(),
    includeVideo:varchar('includeVideo').notNull().default('Yes'),
    courseOutput:json('courseOutput').notNull(),
    createdBy:varchar('createdBy').notNull(),
    userName:varchar('userName').notNull(),
    userProfileImage:varchar('userProfileImage').notNull(),
    publish:boolean('publish').notNull().default(false),
})

export const Chapters=pgTable("Chapters",{
    id:serial('id').primaryKey(),
    courseId:varchar('courseId').notNull(),
    chapterId:integer('chapterId').notNull(),
    content:json('content').notNull(),
    videoId:varchar('videoId').notNull(),
    
})
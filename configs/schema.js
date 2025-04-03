import { pgTable ,serial ,varchar,json } from "drizzle-orm/pg-core";

export const CourseList = pgTable("CourseList",{
    id:serial('id').primaryKey(),
    courseId:varchar('courseId').notNull(),
    name:varchar('name').notNull(),
    category:varchar('category').notNull(),
    difficulty:varchar('difficulty').notNull(),
    courseOutput:json('courseOutput').notNull(),
    createdBy:varchar('createdBy').notNull(),
    userName:varchar('userName').notNull(),
    userProfileImage:varchar('userProfileImage').notNull(),
})
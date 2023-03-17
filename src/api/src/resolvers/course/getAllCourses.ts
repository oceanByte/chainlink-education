import { Context, Next } from "koa";
import { User } from "../../shared/user/User";
import { authenticate } from "../user/helpers/authenticate";
import { Course, CourseModel } from "../../shared/course/Course";
import { getCourses } from "../../shared/course/courses";
import { ChapterType } from "../../shared/course/courses/course.types";

export type CourseList = {
    id: string

    title: string
    description?: string

    amountOfTime: string
    difficulty: number
    status: string
    countChapters: number
    percent: number
    progress: string[]

    chapters: Omit<ChapterType, 'data'>[]

    urlCourse: string
    urlChapter?: string
}

export const getAllCourses = async (ctx: Context, next: Next): Promise<any> => {
    let userCourses: Course[] = [];

    try {
        const user: User = await authenticate(ctx);

        // Get user courses to match with course list
        userCourses = await CourseModel.find({ userId: user._id });
    } catch (e) {
        // token and user is optional, If we don't have a token we can continue without user authentication
        console.log(`Status: ${e.status}, message: ${e.message}`);
    }

    // Get course list by user courses
    const response: CourseList[] = getCourses(userCourses);

    ctx.status = 200;
    ctx.body = response;

    await next();
}
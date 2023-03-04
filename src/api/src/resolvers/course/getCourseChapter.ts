import { Context, Next } from "koa";
import { Course, CourseModel } from "../../shared/course/Course";
import { User } from "../../shared/user/User";
import { authenticate } from "../user/helpers/authenticate";
import { CourseList } from "./getAllCourses";
import { ChapterType } from "../../shared/course/courses/course.types";
import { getCourseWithChapter } from "../../shared/course/courses";

export type CourseWithChapter = {
    progress: string[],
    chapter: ChapterType
} & Omit<CourseList, "chapters">


export const getCourseChapter = async (ctx: Context, next: Next): Promise<void> => {
    const req = ctx.request as any

    const coursePath: string = req.params.path
    const chapterPath: string = req.params.chapterPath

    let userCourses: Course[] = [];

    try {
        const user: User = await authenticate(ctx);

        // Get user courses to match with course list
        userCourses = await CourseModel.find({ userId: user._id });
    } catch (e) {
        // token and user is optional, If we don't have a token we can continue without user authentication
        console.log(`Status: ${e.status}, message: ${e.message}`);
    }
    const course = getCourseWithChapter({ coursePath, chapterPath }, userCourses);

    ctx.status = 200
    ctx.body = { course }

    await next();
}
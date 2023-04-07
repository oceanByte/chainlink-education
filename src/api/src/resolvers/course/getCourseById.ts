import {Context, Next} from "koa";
import {getCourseByPath} from "../../shared/course/courses";
import {User} from "../../shared/user/User";
import {authenticate} from "../user/helpers/authenticate";
import {Course, CourseModel} from "../../shared/course/Course";
import {ChapterType} from "../../shared/course/courses/course.types";
import {CourseList} from "./getAllCourses";

export type CourseWithChapters = {
    descriptionCourse: string,
    progress: string[],
    chapters: ChapterType[]
} & CourseList

export const getCourse = async (ctx: Context, next: Next): Promise<void> => {
    const req = ctx.request as any
    const coursePath: string = req.params.path
    let userCourses: Course[] = [];

    try {
        const user: User = await authenticate(ctx);

        // Get user courses to match with course list
        userCourses = await CourseModel.find({userId: user._id});
    } catch (e) {
        // token and user is optional, If we don't have a token we can continue without user authentication
        console.log(`Status: ${e.status}, message: ${e.message}`);
    }
    const course = getCourseByPath(coursePath, userCourses);

    ctx.status = 200
    ctx.body = {course}

    await next();
}
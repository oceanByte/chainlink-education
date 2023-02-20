import {Context, Next} from "koa";
import {User} from "../../shared/user/User";
import {authenticate} from "../user/helpers/authenticate";
import {CourseModel} from "../../shared/course/Course";
import {getCourses} from "../../shared/course/courses";

export type CourseList = {
    title: string
    countChapters: number
    time: string
    description: string
    difficulty: number
    status: string
    percent: number
}

export const getAllCourses = async (ctx: Context, next: Next): Promise<any> => {
    const user: User = await authenticate(ctx);

    // Get user courses to match with course list
    const userCourses = await CourseModel.find({userId: user._id});

    // Get course list by user courses
    const fileCourses: CourseList[] | void = getCourses(userCourses);

    ctx.status = 200;
    ctx.body = fileCourses;

    await next();
}
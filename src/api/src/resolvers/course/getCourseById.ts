import {Context, Next} from "koa";

export const getCourseById = async (ctx: Context, next: Next): Promise<void> => {
    const req = ctx.request as any
    const courseId = req.params.courseId

    const courses = [
        {
            id: 1,
            name: 'Course 1'
        },
        {
            id: 2,
            name: 'Course 2'
        },
        {
            id: 3,
            name: 'Course 3'
        },
        {
            id: 4,
            name: 'Course 4'
        },
        {
            id: 5,
            name: 'Course 5'
        }
    ]

    const course = courses.find(course => Number(course.id) === Number(courseId))
    console.log(course)
    ctx.status = 200
    ctx.body = course

    await next();
}
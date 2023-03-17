import {Context, Next} from "koa";
import {Course, CourseModel} from "../../shared/course/Course";
import {courses} from "../../shared/course/courses";


export const Refactor = async (ctx: Context, next: Next): Promise<void> => {
    let userCourses: Course[] = await CourseModel.find().lean()

    for (const course of userCourses) {
        const savedCourse = courses.find(c => c.course.title === course.title);

        if(!savedCourse) {
            console.log('course not found', course._id);
            return;
        }

        const progress = new Set(course.progress);

        const newChapterTime: any = [];

        progress.forEach(p => {
            const chapterTime = course.chapterTimes.find(c => c.chapter === p);

            const objectToStore = chapterTime ? chapterTime :
                {
                    chapter: p,
                    time: Math.floor(Math.random() * 8) + 4
                }

            newChapterTime.push(objectToStore)
        })

        const status = progress.size === 0 ? 'NEW' : (progress.size === savedCourse.chapters.length ? "COMPLETED" : "IN PROGRESS");
        console.log(progress.size)
        console.log(status)
        await CourseModel.updateOne(
            {_id: course._id},
            {
                $set: {
                    progress: Array.from(progress),
                    chapterTimes: newChapterTime,
                    status
                },
            })
            .exec();
    }

    ctx.status = 200;
    ctx.body = {};

    await next();
}
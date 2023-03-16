import {Context, Next} from "koa";
import {Course, CourseModel} from "../../shared/course/Course";


export const Refactor = async (ctx: Context, next: Next): Promise<void> => {
    let courses: Course[] = await CourseModel.find().lean()


    for (const course of courses) {
        if(!course.progress.length) continue;

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

        await CourseModel.updateOne(
            {_id: course._id},
            {
                $set: {
                    progress: Array.from(progress),
                    chapterTimes: newChapterTime
                },
            })
            .exec();
    }

    ctx.status = 200;
    ctx.body = {};

    await next();
}
import {Context, Next} from "koa";
import {User} from "../../../shared/user/User";
import {authenticate} from "../helpers/authenticate";
import {plainToClass} from "class-transformer";
import {validateOrReject} from "class-validator";
import {firstError} from "../../../helpers/firstError";
import {V1AddProgress} from "../../../shared/user/v1AddProgress";
import {Course, CourseModel} from "../../../shared/course/Course";
import {ResponseError} from "../../../shared/mongo/ResponseError";
import {courses, getCourseWithChapter} from "../../../shared/course/courses";
import {Certificate, CertificateModel} from "../../../shared/certificate/Certificate";
import {CourseStatusType} from "../../../shared/course/CourseType";
import {CourseChapterType} from "../../../shared/course/courses/course.types";

export const storeUserProgress = async (ctx: Context, next: Next) => {
    const user: User = await authenticate(ctx);

    const options = plainToClass(V1AddProgress, ctx.request.body, {excludeExtraneousValues: true})
    await validateOrReject(options, {forbidUnknownValues: true}).catch(firstError)

    /** Update user course **/
    await CourseModel.updateOne(
        {_id: options.courseId, 'chapterTimes.chapter': {$nin: [options.chapterPath]}},
        {
            $push: {
                chapterTimes: {chapter: options.chapterPath, time: options.date_of_completion},
                progress: options.chapterPath
            }
        })
        .exec();

    const userCourse: Course | null = await CourseModel.findOne({_id: options.courseId, userId: user._id}).exec();
    if (!userCourse) throw new ResponseError(404, 'Course not found');

    const course = courses.find((cc: CourseChapterType) => cc.course.path === options.coursePath)
    if(!course) throw new ResponseError(404, 'Course not found');

    /** Check if all chapters are completed **/
    if (userCourse.progress.length === course.chapters.length) {

        const certificate = await CertificateModel.findOne({
            coursePath: options.coursePath,
            username: user.username
        }).lean()

        if (!certificate) {

            await CourseModel.updateOne({_id: options.courseId}, {$set: {status: CourseStatusType.COMPLETED}}).exec();

            await CertificateModel.create<Certificate>({
                coursePath: options.coursePath,
                username: user.username,
                userId: user._id,
                courseId: options.courseId,
                code: ''
            });
        }
    }

    /** Response data **/
    const userCourses = await CourseModel.find({userId: user._id});

    const paths = options.chapterPath.split('/');
    const idChapterPath = paths[paths.length - 1]

    const courseWithChapter = getCourseWithChapter({coursePath: options.coursePath, chapterPath: idChapterPath}, userCourses)

    ctx.status = 200;
    ctx.body = {course: courseWithChapter}

    await next();
};

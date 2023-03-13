import {plainToClass} from 'class-transformer'
import {validateOrReject} from 'class-validator'
import {Context, Next} from 'koa'

import {firstError} from '../../../helpers/firstError'
import {toPublicUser} from '../../../helpers/toPublicUser'
import {Course, CourseModel} from '../../../shared/course/Course'
import {Certificate, CertificateModel} from '../../../shared/certificate/Certificate'
import {CourseStatusType, CourseTitleType} from '../../../shared/course/CourseType'
import {AddProgressInputs, AddProgressOutputs} from '../../../shared/user/AddProgress'
import {PublicUser} from '../../../shared/user/PublicUser'
import {User, UserModel} from '../../../shared/user/User'
import {rateLimit} from '../../quota/rateLimit/rateLimit'
import {authenticate} from '../helpers/authenticate'

export const PUBLIC_USER_MONGO_SELECTOR = '_id username emailVerified createdAt'

export const addProgress = async (ctx: Context, next: Next): Promise<void> => {
    const addProgressArgs = plainToClass(AddProgressInputs, ctx.request.body, {excludeExtraneousValues: true})
    await validateOrReject(addProgressArgs, {forbidUnknownValues: true}).catch(firstError)
    const {chapterDone, courseId, time, isCompleted, coursePath} = addProgressArgs

    const user: User = await authenticate(ctx)

    await rateLimit(user._id)

    await CourseModel.updateOne(
        {_id: courseId, 'chapterTimes.chapter': {$nin: [chapterDone]}},
        {
            $push: {
                chapterTimes: {
                    chapter: chapterDone,
                    time
                },
                progress: chapterDone
            },
            $set: {status: isCompleted ? CourseStatusType.COMPLETED : CourseStatusType.IN_PROGRESS}
        })
        .exec();

    if (isCompleted) {
        const certificate = await CertificateModel.findOne({
            coursePath,
            username: user.username,
        }).lean() as Certificate

        if (!certificate) {
            await CertificateModel.create<Certificate>({
                coursePath,
                username: user.username,
                userId: user._id,
                courseId,
                code: ''
            });
        }
    }

    const updatedUser: User = await UserModel.findOne(
        {_id: user._id},
    ).lean() as User

    const publicUser: PublicUser = toPublicUser(updatedUser)

    const updatedCourse: Course = await CourseModel.findOne(
        {_id: courseId},
    ).lean() as Course
    // set referral to completed
    if (
        updatedCourse.title === CourseTitleType.CHAINLINK_101 &&
        updatedCourse.progress &&
        updatedCourse.progress.length >= 8
    ) {
        // update referral status
        await UserModel.updateOne(
            {"referral": {$elemMatch: {username: publicUser.username, status: CourseStatusType.PENDING}}},
            {$set: {"referral.$.status": CourseStatusType.COMPLETED}}) // TODO: use const enum here
            .exec();
    }

    const courses = await CourseModel.find({userId: updatedUser._id}).lean();

    const response: AddProgressOutputs = {
        user: {
            ...publicUser,
            courses
        }
    }

    ctx.status = 200
    ctx.body = response

    await next()
}

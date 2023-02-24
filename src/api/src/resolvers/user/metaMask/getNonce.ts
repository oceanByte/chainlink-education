import {Context, Next} from "koa";
import {User, UserModel} from "../../../shared/user/User";
import {hash} from "bcryptjs";
import {Course, CourseModel} from "../../../shared/course/Course";
import {courses} from "../../../shared/course/courses";

export const getNonce = async (ctx: Context, next: Next) => {
    const {publicAddress} = ctx.request.body

    const user: User | null = await UserModel.findOne({publicAddress}).lean()

    if(user) {
        ctx.status = 200
        ctx.body = {nonce: user.nonce}
        await next()
        return;
    }

    const hashedPassword = await hash(publicAddress, 12);

    const newUser: User = await UserModel.create<User>({
        email: publicAddress + '@metamaskmail.com',
        username: publicAddress.slice(0, 10),
        nonce: Math.floor(Math.random() * 10000),
        hashedPassword,
        publicAddress,
    } as User)

    for (const course of courses) {
        await CourseModel.create<Course>({
            userId: newUser._id,
            title: course.course.title,
            description: course.course.description,
            difficulty: course.course.difficulty,
            status: course.course.status
        } as Course)
    }

    ctx.status = 200
    ctx.body = {nonce: newUser.nonce}
    await next()
    return;
};

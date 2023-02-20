import {Context, Next} from "koa";

export const getCourseChapter = async (ctx: Context, next: Next): Promise<void> => {
    console.log(ctx, next)
}
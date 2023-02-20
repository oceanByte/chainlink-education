import {Context, Next} from "koa";

export const validateChapterAnswer = async (ctx: Context, next: Next): Promise<void> => {
    console.log(ctx, next)
}
import {Context, Next} from "koa";
import {validateAnswer} from "../../shared/course/courses";

export const validateChapterAnswer = async (ctx: Context, next: Next): Promise<void> => {
    const req = ctx.request as any

    const coursePath: string = req.params.path
    const chapterPath: string = req.params.chapterPath
    const answer: string[] = req.body.answer;

    const answerIs = validateAnswer({coursePath, chapterPath, answer});

    ctx.status = 200
    ctx.body = { answerIs }
    await next();
}

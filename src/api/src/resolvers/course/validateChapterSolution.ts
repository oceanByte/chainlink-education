import {Context, Next} from "koa";
import {validateSolution} from "../../shared/course/courses";
import {authenticate} from "../user/helpers/authenticate";
import {plainToClass} from "class-transformer";
import {validateOrReject} from "class-validator";
import {firstError} from "../../helpers/firstError";
import {ValidateSolution} from "../../shared/user/validateSolution";

export const validateChapterSolution = async (ctx: Context, next: Next): Promise<void> => {
    await authenticate(ctx);

    const options: ValidateSolution = plainToClass(ValidateSolution, ctx.request.body, {excludeExtraneousValues: true})
    await validateOrReject(options, {forbidUnknownValues: true}).catch(firstError)

    const req = ctx.request as any

    const coursePath: string = req.params.path
    const chapterPath: string = req.params.chapterPath
    const solution: string = options.solution;

    const answerIs = validateSolution({coursePath, chapterPath, solution});

    ctx.status = 200
    ctx.body = { answerIs }
    await next();
}

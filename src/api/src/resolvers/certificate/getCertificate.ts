import {Context, Next} from "koa";
import {User} from "../../shared/user/User";
import {authenticate} from "../user/helpers/authenticate";
import {Certificate, CertificateModel} from "../../shared/certificate/Certificate";
import {ResponseError} from "../../shared/mongo/ResponseError";


export const getCertificate = async (ctx: Context, next: Next): Promise<void> => {
    const user: User = await authenticate(ctx);

    const req = ctx.request as any
    const coursePath: string = req.params.coursePath

    let certificate: Certificate | null = await CertificateModel.findOne({ username: user.username, coursePath }).lean()

    if (!certificate) throw new ResponseError(404, 'Certificate not found.')

    ctx.status = 200;
    ctx.body = {certificate};

    await next();
}
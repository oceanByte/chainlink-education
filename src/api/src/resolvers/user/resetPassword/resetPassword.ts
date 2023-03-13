import {plainToClass} from 'class-transformer'
import {validateOrReject} from 'class-validator'
import {Context, Next} from 'koa'
import {ResetPasswordInputs} from '../../../shared/user/ResetPassword'
import {firstError} from '../../../helpers/firstError'

import {hash} from 'bcryptjs'
import {Captcha, CaptchaModel} from '../../../shared/captcha/Captcha'
import {CaptchaFor} from '../../../shared/captcha/CaptchaFor'
import {ResponseError} from '../../../shared/mongo/ResponseError'
import {User, UserModel} from '../../../shared/user/User'
import {verifyCaptcha} from '../helpers/verifyCaptcha'
import {rateLimit} from '../../quota/rateLimit/rateLimit'

export const resetPassword = async (ctx: Context, next: Next): Promise<void> => {
    const resetPasswordArgs = plainToClass(ResetPasswordInputs, ctx.request.body, {excludeExtraneousValues: true})
    await validateOrReject(resetPasswordArgs, {forbidUnknownValues: true}).catch(firstError)
    const {solution, token, newPassword} = resetPasswordArgs;

    const captcha: Captcha | null = await CaptchaModel.findOne({
        token,
        captchaFor: CaptchaFor.CAPTCHA_FOR_RESET_PASSWORD,
    }).lean()

    if (!captcha) throw new ResponseError(401, 'Wrong token key')

    const user: User | null = await UserModel.findOne({_id: captcha.userId}).lean();

    if (!user) throw new ResponseError(404, 'User not found')

    await rateLimit(user._id)

    await verifyCaptcha(user._id, solution, CaptchaFor.CAPTCHA_FOR_RESET_PASSWORD)

    const hashedPassword: string = await hash(newPassword, 12)

    await UserModel.updateOne({_id: user._id}, {hashedPassword}).exec()

    await CaptchaModel.deleteOne({_id: captcha._id}).exec()

    ctx.status = 200
    ctx.body = {message: 'Password changed successfully!'}

    await next()
}

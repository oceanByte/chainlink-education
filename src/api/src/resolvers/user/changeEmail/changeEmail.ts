import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Context, Next } from 'koa'

import { firstError } from '../../../helpers/firstError'
import { ChangeEmailInputs } from '../../../shared/user/ChangeEmail'
import { User, UserModel } from '../../../shared/user/User'
import { rateLimit } from '../../quota/rateLimit/rateLimit'
import { authenticate } from '../helpers/authenticate'
import { QuotaType } from '../../../shared/quota/QuotaType';
import { Captcha, CaptchaModel } from '../../../shared/captcha/Captcha';
import { createCaptcha } from '../../captcha/helpers/createCaptcha';
import { CaptchaFor } from '../../../shared/captcha/CaptchaFor';
import { sendEmailConfirmEmail } from '../helpers/sendEmailConfirmEmail';
import { ResponseError } from '../../../shared/mongo/ResponseError'
import { verifyCaptcha } from '../helpers/verifyCaptcha'
import { CourseModel } from '../../../shared/course/Course'
import { toPublicUser } from '../../../helpers/toPublicUser'
import { PublicUser } from '../../../shared/user/PublicUser'

export const changeEmailPending = async (ctx: Context, next: Next): Promise<void> => {
  const changeEmailArgs = plainToClass(ChangeEmailInputs, ctx.request.body, { excludeExtraneousValues: true })
  await validateOrReject(changeEmailArgs, { forbidUnknownValues: true }).catch(firstError)
  const { email } = changeEmailArgs

  const user: User = await authenticate(ctx)

  await rateLimit(user._id, QuotaType.NEW_CAPTCHA)

  const captcha: Captcha = await createCaptcha(user._id, CaptchaFor.CAPTCHA_FOR_CHANGE_EMAIL)

  await sendEmailConfirmEmail(email, captcha.token)

  const courses = await CourseModel.find({ userId: user._id });

  const publicUser: PublicUser = toPublicUser(user)
  
  const response = { user: {
		...publicUser,
    changeEmailPending: true,
		courses
	} }

  ctx.status = 200
  ctx.body = response

  await next()
}

export const changeEmailSuccess = async (ctx: Context, next: Next): Promise<void> => {

  const { key: token, email } = ctx.request.query

  const captcha: Captcha = (await CaptchaModel.findOne({
    token,
    captchaFor: CaptchaFor.CAPTCHA_FOR_CHANGE_EMAIL,
  }).lean()) as Captcha
  if (!captcha) throw new ResponseError(401, 'Wrong token key')

  const user: User = (await UserModel.findOne({ _id: captcha.userId }).lean()) as User
  if (!user) throw new ResponseError(404, 'User not found')

  await verifyCaptcha(user._id, captcha.solution, CaptchaFor.CAPTCHA_FOR_CHANGE_EMAIL)

  await UserModel.updateOne(
    { _id: user._id },
    { $set: { email } },
  ).exec()


  ctx.redirect(`${process.env.FRONTEND_URL}/profile?accountInfo=2`);

  await next()
}
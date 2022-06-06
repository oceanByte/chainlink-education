import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Context, Next } from 'koa'

import { firstError } from '../../../helpers/firstError'
import { Captcha, CaptchaModel } from '../../../shared/captcha/Captcha'
import { CaptchaFor } from '../../../shared/captcha/CaptchaFor'
import { ResponseError } from '../../../shared/mongo/ResponseError'
import { User, UserModel } from '../../../shared/user/User'
import { CourseModel } from '../../../shared/course/Course'
import { CertificateModel } from '../../../shared/certificate/Certificate'
import { QuotaModel } from '../../../shared/quota/Quota'
import { createCaptcha } from '../../captcha/helpers/createCaptcha'

import { rateLimit } from '../../quota/rateLimit/rateLimit'
import { QuotaType } from '../../../shared/quota/QuotaType'
import { DeleteAccountPendingInputs, DeleteAccountPermanentlyInputs } from '../../../shared/user/DeleteAccount'
import { sendEmailDeleteAccount } from '../helpers/sendEmailDeleteAccount'
import { matchPassword } from '../helpers/matchPassword'
import { verifyCaptcha } from '../helpers/verifyCaptcha'
import { PublicUser } from '../../../shared/user/PublicUser'
import { toPublicUser } from '../../../helpers/toPublicUser'

export const deleteAccountPending = async (ctx: Context, next: Next): Promise<void> => {
  const deleteAccountArgs = plainToClass(DeleteAccountPendingInputs, ctx.request.body, { excludeExtraneousValues: true })
  await validateOrReject(deleteAccountArgs, { forbidUnknownValues: true }).catch(firstError)
  const { id } = deleteAccountArgs

  let user: User | null = await UserModel.findOne({ _id: id }).lean()

  if (!user) throw new ResponseError(401, 'User not found')

  await rateLimit(user._id, QuotaType.NEW_CAPTCHA)

  const captcha: Captcha = await createCaptcha(user._id, CaptchaFor.CAPTCHA_FOR_DELETE_ACCOUNT)

  await sendEmailDeleteAccount(user.email, captcha.token)

  const courses = await CourseModel.find({ userId: user._id }).lean();

  const publicUser: PublicUser = toPublicUser(user)

  const response = { user: {
		...publicUser,
    deleteAccountPending: true,
		courses
	} }

  ctx.status = 200
  ctx.body = response

  await next()
}


export const deleteAccountPermanently = async (ctx: Context, next: Next): Promise<void> => {
  const deleteAccountArgs = plainToClass(DeleteAccountPermanentlyInputs, ctx.request.body, { excludeExtraneousValues: true })
  await validateOrReject(deleteAccountArgs, { forbidUnknownValues: true }).catch(firstError)
  const { token, password } = deleteAccountArgs

  const captcha: Captcha = (await CaptchaModel.findOne({
    token,
    captchaFor: CaptchaFor.CAPTCHA_FOR_DELETE_ACCOUNT,
  }).lean()) as Captcha
  if (!captcha) throw new ResponseError(401, 'Wrong token key')

  const user: User = (await UserModel.findOne({ _id: captcha.userId }).lean()) as User
  if (!user) throw new ResponseError(404, 'User not found')

  await matchPassword(password, user.hashedPassword)

  await verifyCaptcha(user._id, captcha.solution, CaptchaFor.CAPTCHA_FOR_DELETE_ACCOUNT)

  await CourseModel.deleteMany({ userId: user._id });
  await CertificateModel.deleteMany({ userId: user._id });
  await QuotaModel.deleteMany({ userId: user._id });

  await UserModel.deleteOne({ _id: user._id }).exec()

  await CaptchaModel.deleteMany({ _id: captcha._id }).exec()

  ctx.status = 200
  ctx.body = {}

  await next()
}

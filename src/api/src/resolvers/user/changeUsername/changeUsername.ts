import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Context, Next } from 'koa'

import { firstError } from '../../../helpers/firstError'

import { User, UserModel } from '../../../shared/user/User'
import { rateLimit } from '../../quota/rateLimit/rateLimit'
import { authenticate } from '../helpers/authenticate'
import { QuotaType } from '../../../shared/quota/QuotaType';
import { ResponseError } from '../../../shared/mongo/ResponseError'
import { CourseModel } from '../../../shared/course/Course'
import { toPublicUser } from '../../../helpers/toPublicUser'
import { PublicUser } from '../../../shared/user/PublicUser'
import { ChangeUsernameInputs } from '../../../shared/user/ChangeUsername'
import { CertificateModel } from '../../../shared/certificate/Certificate'

export const changeUsername = async (ctx: Context, next: Next): Promise<void> => {
  const changeUsernameArgs = plainToClass(ChangeUsernameInputs, ctx.request.body, { excludeExtraneousValues: true })
  await validateOrReject(changeUsernameArgs, { forbidUnknownValues: true }).catch(firstError)
  const { username } = changeUsernameArgs

  const user: User = await authenticate(ctx)

  const findUser: User | null = await UserModel.findOne({ username }).lean()
  if (findUser) throw new ResponseError(400, 'This username is already being used')

  await rateLimit(user._id, QuotaType.DEFAULT_LIMIT)

  await UserModel.updateOne(
    { _id: user._id },
    { $set: { username } },
  ).exec()

  await CertificateModel.updateMany({ userId: user._id }, { $set: { username } })

  const courses = await CourseModel.find({ userId: user._id }).lean();

  const newUser = await UserModel.findOne({ _id: user._id }).lean()

  const publicUser: PublicUser = toPublicUser(newUser || user)
  
  const response = { user: {
		...publicUser,
		courses
	} }

  ctx.status = 200
  ctx.body = response

  await next()
}

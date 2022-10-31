import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Context, Next } from 'koa'

import { firstError } from '../../../helpers/firstError'
import { CourseModel } from '../../../shared/course/Course'
import { ResponseError } from '../../../shared/mongo/ResponseError'
import { GetPublicUserInputs, GetPublicUserOutputs } from '../../../shared/page/GetPublicUser'
import { PublicUser } from '../../../shared/user/PublicUser'
import { UserModel } from '../../../shared/user/User'

export const PUBLIC_USER_MONGO_SELECTOR = '_id username name email emailVerified progress createdAt referral accountName publicAddress'

export const getPublicUser = async (ctx: Context, next: Next): Promise<void> => {
  const getPublicUserArgs = plainToClass(GetPublicUserInputs, ctx.request.body, { excludeExtraneousValues: true })
  await validateOrReject(getPublicUserArgs, { forbidUnknownValues: true }).catch(firstError)
  const { username } = getPublicUserArgs

  const user: PublicUser = (await UserModel.findOne({ username }, PUBLIC_USER_MONGO_SELECTOR).lean()) as PublicUser
  if (!user) throw new ResponseError(404, 'User not found')

  const courses = await CourseModel.find({ userId: user._id }).lean();

  let pending = 0
  let completed = 0
  let rewarded = 0

  if (user && user.referral) {
      user.referral.forEach(item => {
          switch (item.status) {
              case 'PENDING':
                  pending++;
                  break;
              case 'COMPLETED':
                  completed++;
                  break;
              case 'REWARDED':
                  rewarded++;
                  break;
          }
      })
  }

  user.stats = {
    pending,
    completed,
    rewarded
  }


  const response: GetPublicUserOutputs = { user: {
      ...user,
      courses
  }}

  ctx.status = 200
  ctx.body = response

  await next()
}

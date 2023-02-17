import { hash } from 'bcryptjs'
import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Context, Next } from 'koa'

import { firstError } from '../../../helpers/firstError'
import { toPublicUser } from '../../../helpers/toPublicUser'
import { ResponseError } from '../../../shared/mongo/ResponseError'
/* import { Referral } from '../../../shared/referral/Referral'
import { ReferralStatus } from '../../../shared/referral/ReferralStatus' */
import { Jwt } from '../../../shared/user/Jwt'
import { PublicUser } from '../../../shared/user/PublicUser'
import { SignUpInputs, SignUpOutputs } from '../../../shared/user/SignUp'
import { User, UserModel } from '../../../shared/user/User'
import { Course, CourseModel } from '../../../shared/course/Course'
import { getSignedJwt } from '../helpers/getSignedJwt'
import { verifyRecaptchaToken } from '../helpers/verifyRecaptchaToken'
import { COURSES } from '../../../shared/course/CourseType';

export const signUp = async (ctx: Context, next: Next): Promise<void> => {
  const signUpArgs = plainToClass(SignUpInputs, ctx.request.body, { excludeExtraneousValues: true })
  await validateOrReject(signUpArgs, { forbidUnknownValues: true }).catch(firstError)
  let { username, email, password, recaptchaToken } = signUpArgs

  username = username.toLowerCase()
  email = email.toLowerCase()

  await verifyRecaptchaToken(recaptchaToken)

  const emailAlreadyTaken: User | null = await UserModel.findOne({ email }).lean()
  if (emailAlreadyTaken) throw new ResponseError(400, 'Email is already taken')

  const usernameAlreadyTaken: User | null = await UserModel.findOne({ username }).lean()
  if (usernameAlreadyTaken) throw new ResponseError(400, 'Username is already taken')

  /* if (referral) {
    referral = referral.toLowerCase()
    const referralDoesNotExist: User | null = await UserModel.findOne({ username: referral }).lean()
    if (!referralDoesNotExist) throw new ResponseError(400, 'Referral does not exist')
    const newReferral: Referral = { username, status: ReferralStatus.PENDING };
    await UserModel.updateOne({ username: referral }, { $addToSet : {referral: newReferral} }).exec()
  } */
  
  const hashedPassword = await hash(password, 12)
  const user: User = await UserModel.create<User>({ email, username, hashedPassword } as User)

  for (const course of COURSES) {
    await CourseModel.create<Course>({
      userId: user._id,
      title: course.title,
      description: course.description,
      difficulty: course.difficulty,
      status: course.status
    } as Course)
  }
  
  const courses = await CourseModel.find({ userId: user._id }).lean();

  const publicUser: PublicUser = toPublicUser(user)

  const jwt: Jwt = getSignedJwt(user._id.toHexString(), user.username)

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

  publicUser.stats = {
    pending,
    completed,
    rewarded
  }
  
  const response: SignUpOutputs = { jwt, user: {
    ...publicUser,
    courses
  } }

  ctx.status = 200
  ctx.body = response

  await next()
}

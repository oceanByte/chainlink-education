import { Context, Next } from 'koa'

import * as getRandomCaptchaPairObject from '../resolvers/captcha/helpers/getRandomCaptchaPair'
// import * as sendEmailVerifyEmailObject from '../resolvers/user/helpers/sendEmailVerifyEmail'
import { signUp } from '../resolvers/user/signUp/signUp'
import { CaptchaSolution } from '../shared/captcha/CaptchaSolution'
import { Jwt } from '../shared/user/Jwt'
import { User, UserModel } from '../shared/user/User'
import { mockConnect } from './mockConnect'

interface UserContextNext {
  user: User
  jwt: Jwt
  next: Next
}

interface CreateTestUser {
  (email: string, username: string, password: string): Promise<UserContextNext>
}

export const createTestUser: CreateTestUser = async (email, username, password) => {
  process.env.JWT_PRIVATE_KEY = ''
  process.env.JWT_PUBLIC_KEY = ''
  await mockConnect()

  const captchaIndex = 0
  const captchaSolution: CaptchaSolution = '0000'

  jest.spyOn(getRandomCaptchaPairObject, 'getRandomCaptchaPair').mockReturnValue({ captchaIndex, captchaSolution })
  // jest.spyOn(sendEmailVerifyEmailObject, 'sendEmailVerifyEmail').mockImplementation(async () => Promise.resolve())

  const signUpContext: Context = {
    request: {
      headers: {},
      body: {
        email,
        username,
        password,
        confirmPassword: password,
        recaptchaToken:
          'mockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockTokenmockToken',
      },
    },
  } as Context

  const next: Next = (async () => Promise.resolve()) as Next

  await signUp(signUpContext, next)

  const user: User = (await UserModel.findOne({ username: username }).lean()) as User

  const jwt: Jwt = signUpContext.body.jwt

  return { user, jwt, next }
}

import { ObjectId } from 'mongodb'
import { Captcha, CaptchaModel } from '../../../shared/captcha/Captcha'
import { CaptchaFor } from '../../../shared/captcha/CaptchaFor'

interface CreateCaptcha {
  (userId: ObjectId, captchaFor: CaptchaFor): Promise<Captcha>
}

export const createCaptcha: CreateCaptcha = async (userId, captchaFor) => {
  await CaptchaModel.deleteOne({ userId, captchaFor })

  const index = 0;
  const solution = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

  const cap: Captcha = new Captcha();

  cap.solution = solution
  cap.userId = userId
  cap.index = index
  cap.captchaFor = captchaFor

  const captcha: Captcha = await CaptchaModel.create<Captcha>(cap)

  return captcha
}

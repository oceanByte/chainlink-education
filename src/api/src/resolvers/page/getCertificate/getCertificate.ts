import { CertificateModel } from './../../../shared/certificate/Certificate';
import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Context, Next } from 'koa'

import { firstError } from '../../../helpers/firstError'
import { ResponseError } from '../../../shared/mongo/ResponseError'
import { Certificate } from '../../../shared/certificate/Certificate'
import { GetCertificateInputs } from '../../../shared/page/GetCertificate';
import { CourseModel } from '../../../shared/course/Course';
import { CourseStatusType } from '../../../shared/course/CourseType';

export const getCertificate = async (ctx: Context, next: Next): Promise<void> => {
  const getCertificateArgs = plainToClass(GetCertificateInputs, ctx.request.body, { excludeExtraneousValues: true })

  await validateOrReject(getCertificateArgs, { forbidUnknownValues: true }).catch(firstError)
  const { username, coursePath, courseId } = getCertificateArgs

  let certificate: Certificate | null = await CertificateModel.findOne({ username, coursePath }).lean()

  if (!certificate && courseId) {
    const findCourse = await CourseModel.findOne({ _id: courseId })

    if (findCourse && findCourse.status === CourseStatusType.COMPLETED) {
      await CertificateModel.create<Certificate>({
        coursePath,
        username,
        userId: findCourse.userId,
        courseId,
        code: `` // randomstring.generate({length: 62, charset: 'hex'});
      })

      certificate = await CertificateModel.findOne({ username, coursePath }).lean()

    } else {
      throw new ResponseError(404, 'Certificate not found')
    }
  }

  if (!certificate && !courseId) throw new ResponseError(404, 'Certificate not found')

  const response: Certificate = { ...certificate } as Certificate

  ctx.status = 200
  ctx.body = response

  await next()
}

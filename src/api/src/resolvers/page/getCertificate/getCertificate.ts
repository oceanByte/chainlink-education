import { CertificateModel } from './../../../shared/certificate/Certificate';
import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Context, Next } from 'koa'

import { firstError } from '../../../helpers/firstError'
import { ResponseError } from '../../../shared/mongo/ResponseError'
import { Certificate } from '../../../shared/certificate/Certificate'
import { GetCertificateInputs } from '../../../shared/page/GetCertificate';

export const getCertificate = async (ctx: Context, next: Next): Promise<void> => {
  const getCertificateArgs = plainToClass(GetCertificateInputs, ctx.request.body, { excludeExtraneousValues: true })

  await validateOrReject(getCertificateArgs, { forbidUnknownValues: true }).catch(firstError)
  const { username, coursePath } = getCertificateArgs

  const certificate: Certificate = await CertificateModel.findOne({ username, coursePath }).lean()
  if (!certificate) throw new ResponseError(404, 'Certificate not found')

  const response: Certificate = { ...certificate }

  ctx.status = 200
  ctx.body = response

  await next()
}

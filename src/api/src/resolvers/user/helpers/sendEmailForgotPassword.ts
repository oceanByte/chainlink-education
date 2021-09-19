import { MailDataRequired } from '@sendgrid/helpers/classes/mail'
import * as sendgrid from '@sendgrid/mail'

interface SendEmailForgotPassword {
  (email: string, captchaIndex: string, token: string): Promise<void>
}

export const sendEmailForgotPassword: SendEmailForgotPassword = async (email, captchaSolution, token) => {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string)

  const message: MailDataRequired = {
    to: email,
    from: { name: 'ChainlinkAcademy', email: process.env.FROM_EMAIL as string },
    subject: 'Password reset',
    text: `Please enter the following: ${captchaSolution} on https://chainlinnk.academy/reset-password?key=${token}`,
    html: `Please enter the following: ${captchaSolution} <br />on <a href="https://chainlinnk.academy/reset-password?key=${token}">https://chainlinnk.academy/reset-password?key=${token}</a>`,
  }

  await sendgrid.send(message)
}

import { MailDataRequired } from '@sendgrid/helpers/classes/mail'
import * as sendgrid from '@sendgrid/mail'

interface SendEmailConfirmEmail {
  (email: string, token: string): Promise<void>
}

export const sendEmailConfirmEmail: SendEmailConfirmEmail = async (email, token) => {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string)

  const url = process.env.BACKEND_URL || 'https://chainlink.academy';

  const message: MailDataRequired = {
    to: email,
    from: { name: 'ChainlinkAcademy', email: process.env.FROM_EMAIL as string },
    subject: 'Change email',
    text: `Follow the link to confirm your email: ${url}/user/change-email?key=${token}&email=${email}`,
    html: `Follow the link to confirm your email: <a href="${url}/user/change-email?key=${token}&email=${email}">${url}/user/change-email?key=${token}&email=${email}</a>`,
  }

  await sendgrid.send(message)
}

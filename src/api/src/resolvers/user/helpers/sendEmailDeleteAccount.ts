import { MailDataRequired } from '@sendgrid/helpers/classes/mail'
import * as sendgrid from '@sendgrid/mail'

interface SendEmailDeleteAccount {
  (email: string, token: string): Promise<void>
}

export const sendEmailDeleteAccount: SendEmailDeleteAccount = async (email, token) => {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string)

  const url = process.env.FRONTEND_URL || 'https://chainlink.academy';

  const message: MailDataRequired = {
    to: email,
    from: { name: 'ChainlinkAcademy', email: process.env.FROM_EMAIL as string },
    subject: 'Delete account',
    text: `Follow the link to confirm: ${url}/delete-account?key=${token}`,
    html: `Follow the link to confirm: <a href="${url}/delete-account?key=${token}">${url}/delete-account?key=${token}</a>`,
  }

  await sendgrid.send(message)
}

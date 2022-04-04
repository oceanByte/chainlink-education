import * as sendgrid from '@sendgrid/mail'
import { sendEmailDeleteAccount } from './sendEmailDeleteAccount'

describe('User', () => {
  beforeAll(async () => {
    process.env.FROM_EMAIL = 'test@test.com'
    process.env.SENDGRID_API_KEY = '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'
  })

  it('delete account send email', async (done) => {
    const email = 'copalulagu-6040@yopmail.com'
    const key = 'test'

    const emailMsg = {
      from: { email: 'test@test.com', name: 'ChainlinkAcademy' },
      html:
        'Follow the link to confirm: <a href="https://chainlink.academy/delete-account?key=test">https://chainlink.academy/delete-account?key=test</a>',
      subject: 'Delete account',
      text:
        'Follow the link to confirm: https://chainlink.academy/delete-account?key=test',
      to: '',
    }

    jest.spyOn(sendgrid, 'send').mockImplementation((emailMsg): any => {
      expect(emailMsg).toBeDefined()
    })

    await sendEmailDeleteAccount(email, key)

    expect(sendgrid.send).toHaveBeenCalledWith(emailMsg)

    done()
  })

  afterAll(async () => {
    jest.clearAllMocks()
  })
})

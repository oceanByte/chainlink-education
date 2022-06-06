import { Jwt } from '../../../shared/user/Jwt'
import { JwtPayload } from '../../../shared/user/JwtPayload'
import { getSignedJwt } from './getSignedJwt'
import { verifySignedJwt } from './verifySignedJwt'

describe('User', () => {
  beforeAll(() => {
    process.env.JWT_PRIVATE_KEY = ''
    process.env.JWT_PUBLIC_KEY = ''
  })

  it('can verify a signed JWT', () => {
    const _id = 'testId'
    const username = 'testUsername'

    const jwt: Jwt = getSignedJwt(_id, username)
    expect(jwt).toBeDefined()

    const jwtPayload: JwtPayload = verifySignedJwt(jwt)

    expect(jwtPayload._id).toEqual(_id)
    expect(jwtPayload.username).toEqual(username)
  })

  it('jwt verification throws error if not correct', () => {
    try {
      const jwt: Jwt = ''

      verifySignedJwt(jwt)

      throw new Error('Should not reach this point')
    } catch (e) {
      expect(e.message).toEqual('invalid token')
    }
  })
})

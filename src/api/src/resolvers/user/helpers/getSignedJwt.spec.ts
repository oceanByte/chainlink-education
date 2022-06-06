import * as jsonwebtoken from 'jsonwebtoken'

import { Jwt } from '../../../shared/user/Jwt'
import { JwtDecoded } from '../../../shared/user/JwtDecoded'
import { UserRole } from '../../../shared/user/UserRole'
import { getSignedJwt } from './getSignedJwt'

describe('User', () => {
  beforeAll(() => {
    process.env.JWT_PRIVATE_KEY =
  })

  it('can get a signed JWT for users', () => {
    const _id = 'testId'
    const username = 'testUsername'

    const jwt: Jwt = getSignedJwt(_id, username)
    expect(jwt).toBeDefined()

    const jwtDecoded: JwtDecoded = jsonwebtoken.decode(jwt) as JwtDecoded

    expect(jwtDecoded._id).toEqual(_id)
    expect(jwtDecoded.username).toEqual(username)
    expect(jwtDecoded.expiresAt).toBeDefined()
    expect(jwtDecoded.exp).toEqual(jwtDecoded.iat + 2592000)
    expect(jwtDecoded.sub).toEqual(username)
  })

  it('can get a signed JWT for admins', () => {
    const _id = 'testId'
    const username = 'testUsername'

    const jwt: Jwt = getSignedJwt(_id, username, UserRole.ADMIN)
    expect(jwt).toBeDefined()

    const jwtDecoded: JwtDecoded = jsonwebtoken.decode(jwt) as JwtDecoded

    expect(jwtDecoded.userRole).toEqual(UserRole.ADMIN)
  })
})

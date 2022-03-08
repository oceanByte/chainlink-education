import { IsArray, IsDate, IsEmail, IsMongoId, IsNumber, Length, Matches } from 'class-validator'
import { ObjectId } from 'mongodb'

import { Referral } from '../../shared/referral/Referral'

export class PublicUser {
  @IsMongoId()
  readonly _id!: ObjectId

  @Length(2, 20)
  @Matches(/^[a-zA-Z0-9_]*$/, { message: 'Username can only contain letters, numbers and underscores' })
  username!: string

  @Length(2, 40)
  name!: string

  @IsEmail()
  email!: string

  @IsEmail()
  emailVerified?: boolean

  @IsArray()
  progress?: string[]

  @IsDate()
  createdAt!: Date

  @IsArray()
  referral?: Referral[]

  @IsDate()
  certifiedAt?: Date

  @IsNumber()
  nonce?: number

  publicAddress?: string

  @IsArray()
  courses?: any[]

  stats?: Object
}

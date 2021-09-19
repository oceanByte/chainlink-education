// prettier-ignore
import { IsBoolean, IsDate, IsEmail, IsMongoId, IsNumber, IsOptional, Length, Matches, Min } from 'class-validator'
import { ObjectId } from 'mongodb'

import { getModel, Property } from '../../helpers/typegoose'
import { Referral } from '../../shared/referral/Referral'

export class User {
  @IsMongoId()
  readonly _id!: ObjectId

  @Property({ required: true, unique: true, index: true })
  @Length(2, 20)
  @Matches(/^[a-zA-Z0-9_]*$/, { message: 'Username can only contain letters, numbers and underscores' })
  username!: string
  
  @Property()
  @Length(2, 40)
  name!: string

  @Property({ required: true, unique: true, index: true })
  @IsEmail()
  email!: string

  @Property({ nullable: true, optional: true })
  @IsOptional()
  @IsBoolean()
  emailVerified?: boolean

  @Property({ required: true })
  hashedPassword!: string

  @Property({ nullable: true, optional: true })
  progress?: string[]

  @Property({ nullable: true, optional: true })
  @IsOptional()
  // provide a match decorator
  referral?: Referral[]

  @IsDate()
  createdAt!: Date

  @IsDate()
  updatedAt!: Date

  @IsDate()
  @IsOptional()
  certifiedAt?: Date

  @Property()
  @IsNumber()
  @Min(6)
  tokenId?: number
}

export const UserModel = getModel(User, { schemaOptions: { timestamps: true } })

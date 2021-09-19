
import { IsEnum, Length, Matches } from 'class-validator'
import { ReferralStatus } from './ReferralStatus'

export class Referral {
  @Length(2, 20)
  @Matches(/^[a-zA-Z0-9_]*$/, { message: 'Username can only contain letters, numbers and underscores' })
  username!: string

  @IsEnum(ReferralStatus)
  status!: ReferralStatus
}

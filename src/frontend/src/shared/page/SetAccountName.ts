import { Expose } from 'class-transformer'
import { Length, Matches } from 'class-validator'

import { PublicUser } from '../user/PublicUser'

export class SetAccountNameInputs {
  @Expose()
  @Length(3, 40)
  @Matches(/^[a-zA-Z0-9_]*.testnet$/, { message: 'Account name can only contain letters, numbers and underscores and needs to end with .testnet' })
  accountName!: string
}

export class SetNameOutputs {
  user!: PublicUser
}

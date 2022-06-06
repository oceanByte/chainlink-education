import { Length, Matches } from 'class-validator'
import { Expose } from 'class-transformer'

export class ChangeUsernameInputs {
  @Expose()
  @Length(2, 20)
  @Matches(/^[a-zA-Z0-9_]*$/, { message: 'Username can only contain letters, numbers and underscores' })
  username!: string
}

export class ChangeUsernameOutputs {}

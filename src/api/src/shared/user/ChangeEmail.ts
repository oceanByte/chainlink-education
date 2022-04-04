import { Length } from 'class-validator'
import { Expose } from 'class-transformer'

export class ChangeEmailInputs {
  @Expose()
  @Length(2, 40)
  email!: string
}

export class ChangeEmailOutputs {}

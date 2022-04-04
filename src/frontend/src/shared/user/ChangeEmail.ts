import { IsEmail } from 'class-validator'
import { Expose } from 'class-transformer'

export class ChangeEmailInputs {
  @Expose()
  @IsEmail()
  email!: string
}

export class ChangeEmailOutputs {}

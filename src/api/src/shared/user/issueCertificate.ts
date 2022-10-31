import { Length, Matches } from 'class-validator'
import { Expose } from 'class-transformer'

export class IssueCertificateInputs {
  @Expose()
  @Length(42)
  @Matches(/^0x[a-fA-F0-9]{40}$/, { message: 'Address does not match pattern' })
  address?: string

  @Expose()
  coursePath?: string
}

export class IssueCertificateOutputs {}

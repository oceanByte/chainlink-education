import { Expose } from 'class-transformer'
import { Length } from 'class-validator'

export class ContactUsInputs {
  @Expose()
  @Length(2, 50)
  firstName!: string

  @Expose()
  @Length(2, 50)
  lastName!: string

  @Expose()
  @Length(2, 50)
  email!: string

  @Expose()
  @Length(2, 50)
  subject!: string

  @Expose()
  @Length(20, 250)
  question!: string
}

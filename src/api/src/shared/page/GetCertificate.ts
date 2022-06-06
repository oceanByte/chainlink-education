import { Length, Matches } from 'class-validator'
import { Expose } from 'class-transformer'
import { ObjectId } from 'mongodb'

export class GetCertificateInputs {
  @Expose()
  coursePath!: string

  @Expose()
  @Length(2, 20)
  @Matches(/^[a-zA-Z0-9_]*$/, { message: 'Username can only contain letters, numbers and underscores' })
  username!: string

  @Expose()
  courseId?: ObjectId
  
}


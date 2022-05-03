import { ObjectId } from 'mongodb';
import { Expose } from 'class-transformer'

export class GetCertificateInputs {
  @Expose()
  username!: string

  @Expose()
  coursePath!: string

  @Expose()
  courseId?: ObjectId | string
}

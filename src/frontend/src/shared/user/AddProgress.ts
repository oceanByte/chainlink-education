import { Expose } from 'class-transformer'
import { ObjectId } from 'mongodb'

import { PublicUser } from '../user/PublicUser'

export class AddProgressInputs {
  @Expose()
  courseId!: ObjectId

  @Expose()
  chapterPath!: string

  @Expose()
  coursePath!: string

  @Expose()
  date_of_completion!: number
}

export class AddProgressOutputs {
  @Expose()
  user!: PublicUser
}

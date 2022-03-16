import { Expose } from 'class-transformer'
import { Length, Matches } from 'class-validator'
import { ObjectId } from 'mongodb'

import { PublicUser } from '../user/PublicUser'

export class AddProgressInputs {
  @Expose()
  @Length(2, 100)
  @Matches(/^[a-zA-Z0-9-\/]*$/, { message: 'Chapter slug can only contain letters, numbers, dashes and slashes' })
  chapterDone!: string

  courseId!: ObjectId

  @Expose()
  time!: number
}

export class AddProgressOutputs {
  @Expose()
  user!: PublicUser
}

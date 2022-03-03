// prettier-ignore
import { IsMongoId } from 'class-validator'
import { ObjectId } from 'mongodb'

import { getModel, Property } from '../../helpers/typegoose'

export class Course {
  @IsMongoId()
  readonly _id!: ObjectId

  @Property()
  name!: string

  @Property({ nullable: true })
  progress!: string[]

  @Property({ nullable: true })
  userId!: ObjectId
}

export const CourseModel = getModel(Course, { schemaOptions: { timestamps: true } })

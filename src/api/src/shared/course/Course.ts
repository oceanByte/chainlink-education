// prettier-ignore
import { IsEnum, IsMongoId } from 'class-validator'
import { ObjectId } from 'mongodb'

import { getModel, Property } from '../../helpers/typegoose'
import { CourseStatusType } from './CourseType'

type TimeCourse = {
  time: number,
  chapter: string
}

export class Course {
  @IsMongoId()
  readonly _id!: ObjectId

  @Property({ nullable: true })
  title!: string

  @Property({ nullable: true })
  description!: string

  @Property({ nullable: true, default: [] })
  progress!: string[]

  @Property({ nullable: true, default: [] })
  chapterTimes!: [TimeCourse]

  @Property({ nullable: true })
  @IsEnum(CourseStatusType)
  status!: string

  @Property({ nullable: true })
  difficulty!: number

  @Property({ nullable: true })
  userId!: ObjectId
}

export const CourseModel = getModel(Course, { schemaOptions: { timestamps: true } })

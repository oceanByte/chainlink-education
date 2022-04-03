import { IsArray, IsDate, IsEmail, IsMongoId, IsNumber, Length, Matches } from 'class-validator'
import { ObjectId } from 'mongodb'

export class Course {
  @IsMongoId()
  readonly _id?: ObjectId

  @Length(2, 20)
  title!: string

  @IsArray()
  progress!: string[]

  description!: string

  status!: string

  difficulty!: number

  @IsMongoId()
  userId?: ObjectId
}
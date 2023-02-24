import { Expose } from 'class-transformer'
import {IsNumber, IsString} from "class-validator";

export class V1AddProgress {
  @Expose()
  @IsString()
  courseId: string

  @Expose()
  @IsString()
  coursePath: string

  @Expose()
  @IsString()
  chapterPath: string

  @Expose()
  @IsNumber()
  date_of_completion: number
}
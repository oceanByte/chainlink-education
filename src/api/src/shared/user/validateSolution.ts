import {Expose} from 'class-transformer'
import {IsString} from "class-validator";

export class ValidateSolution {
    @Expose()
    @IsString()
    solution: string
}
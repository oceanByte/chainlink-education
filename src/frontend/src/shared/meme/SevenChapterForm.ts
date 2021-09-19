import { Expose } from 'class-transformer'
import { Length, Matches } from 'class-validator'

export class SevenChapterForm {
    @Expose()
    @Length(1, 20)
    meme!: string

    @Expose()
    @Length(1, 100)
    title!: string

    @Expose()
    @Length(1, 100)
    @Matches(/https:\/\/9gag\.com\/gag\/([a-zA-Z0-9]{7})/, { message: 'Web Site should be https://9gag.com'})
    url!: string

    @Expose()
    @Length(1, 1)
    @Matches(/^([1-4])$/, { message: 'Category should be from 1 to 4' })
    category!: number
}

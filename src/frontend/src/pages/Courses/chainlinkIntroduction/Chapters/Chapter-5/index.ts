/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import course from '!raw-loader!./course.md'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import description from '!raw-loader!./description.md'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import { Data } from '../../../../Chapter/Chapter.controller'
import { questions } from './questions'
import { validatorContent } from './validatorContent'

export const data: Data = { course, description, exercise: undefined, solution: undefined, supports: {}, questions, validatorContent }
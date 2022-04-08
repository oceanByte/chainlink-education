/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import course from '!raw-loader!./course.md'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import solution from '!raw-loader!./solution.md'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import { questions } from './questions'

import { Data } from 'pages/Chapter/Chapter.controller'
import { validatorContent } from './validatorContent'

export const data: Data = { course, exercise: undefined, solution, supports: { }, questions, validatorContent }
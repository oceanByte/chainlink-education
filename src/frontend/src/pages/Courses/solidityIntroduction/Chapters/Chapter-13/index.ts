/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import course from '!raw-loader!./course.md'

import { Data } from 'pages/Chapter/Chapter.controller'
import { questions } from './questions'

import { validatorContent } from './validatorContent'

export const data: Data = { course, exercise: undefined, solution: undefined, supports: { }, questions, validatorContent }
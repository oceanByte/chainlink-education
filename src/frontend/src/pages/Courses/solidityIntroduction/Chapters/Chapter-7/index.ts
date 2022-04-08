/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import course from '!raw-loader!./course.md'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import exercise from '!raw-loader!./exercise.md'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import solution from '!raw-loader!./solution.md'

import { Data } from 'pages/Chapter/Chapter.controller'

import { validatorContent } from './validatorContent'

export const data: Data = { course, exercise: undefined, solution: undefined, supports: { }, questions: [], validatorContent }

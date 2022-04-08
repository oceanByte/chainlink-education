/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import course from '!raw-loader!./course.md'

import { Data } from '../../../../Chapter/Chapter.controller'

/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import exercise from '!raw-loader!./exercise.md'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import solution from '!raw-loader!./solution.md'

import { validatorContent } from './validatorContent'

export const data: Data = { course, exercise, solution, supports: {}, questions: [], validatorContent }
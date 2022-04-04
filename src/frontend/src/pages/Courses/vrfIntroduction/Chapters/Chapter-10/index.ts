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

export const data: Data = { course, exercise: undefined, solution, supports: { }, questions }
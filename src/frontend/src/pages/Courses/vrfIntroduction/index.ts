/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import data from '!raw-loader!./module.md'

import { Course } from '../../Course/Course.controller'

export const course: Course = {
    path: "vrfIntroduction",
    description: data,
    amountOfTime: '4 hours',
}

import getFileContent from "../../../../../../helpers/getFileContent";

const course = getFileContent(__dirname + '/course.md');
const exercise = getFileContent(__dirname + '/exercise.md');
const solution = getFileContent(__dirname + '/solution.md');
const description = getFileContent(__dirname + '/description.md');
const video = getFileContent(__dirname + '/video.md');
const hints = getFileContent(__dirname + '/hints.md');

import { validatorContent } from './validatorContent'
import {ChapterDataType} from "../../../course.types";

export const data: ChapterDataType = { course, video, hints, description, exercise, solution, supports: { }, questions: [], validatorContent }

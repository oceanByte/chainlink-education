import getFileContent from "../../../../../../helpers/getFileContent";

const course = getFileContent(__dirname + '/course.md');
const description = getFileContent(__dirname + '/description.md');
const video = getFileContent(__dirname + '/video.md');
const hints = getFileContent(__dirname + '/hints.md');

import { questions } from './questions'
import { validatorContent } from './validatorContent'
import {ChapterDataType} from "../../../course.types";

export const data: ChapterDataType = { course, video, hints, description, exercise: undefined, solution: undefined, supports: { }, questions, validatorContent }
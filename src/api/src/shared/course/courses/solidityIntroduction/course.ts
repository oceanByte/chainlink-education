import getFileContent from "../../../../helpers/getFileContent";
import {CourseType} from "../course.types";
import {CourseStatusType, CourseTitleType} from "../../CourseType";

const data: string = getFileContent(__dirname + "/module.md");

export const course: CourseType = {
    title: CourseTitleType.SOLIDITY_INTRO,
    path: "solidityIntroduction",
    description: data,
    amountOfTime: '30 minutes',
    difficulty: 2,
    status: CourseStatusType.NEW
}

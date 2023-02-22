import getFileContent from "../../../../helpers/getFileContent";
import {CourseType} from "../course.types";
import {CourseStatusType, CourseTitleType} from "../../CourseType";

const data: string = getFileContent(__dirname + "/module.md");

export const course: CourseType = {
    path: "solidity102",
    description: data,
    amountOfTime: '45 minutes',
    title: CourseTitleType.SOLIDITY_102,
    difficulty: 1,
    status: CourseStatusType.NEW
}
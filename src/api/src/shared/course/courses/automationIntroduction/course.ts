import getFileContent from "../../../../helpers/getFileContent";
import {CourseType} from "../course.types";
import {CourseStatusType, CourseTitleType} from "../../CourseType";

const data: string = getFileContent(__dirname + "/module.md");

export const course: CourseType = {
    title: CourseTitleType.CHAINLINK_101,
    path: "automationIntro",
    description: data,
    difficulty: 2,
    amountOfTime: '1 hours',
    status: CourseStatusType.NEW
}
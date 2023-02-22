import getFileContent from "../../../../helpers/getFileContent";
import {CourseType} from "../course.types";
import {CourseStatusType, CourseTitleType} from "../../CourseType";

const data: string = getFileContent(__dirname + "/module.md");

export const course: CourseType = {
    title: CourseTitleType.CHAINLINK_101,
    path: "chainlinkIntroduction",
    description: data,
    difficulty: 1,
    amountOfTime: '2 hours',
    status: CourseStatusType.NEW
}
import getFileContent from "../../../../helpers/getFileContent";
import {CourseType} from "../course.types";
import {CourseStatusType, CourseTitleType} from "../../CourseType";

const data: string = getFileContent(__dirname + "/module.md");

export const course: CourseType = {
    title: CourseTitleType.VRF_V2,
    path: "vrfIntroduction",
    description: data,
    difficulty: 2,
    amountOfTime: '1 hour',
    status: CourseStatusType.NEW
}

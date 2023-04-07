import getFileContent from "../../../../helpers/getFileContent";
import {CourseType} from "../course.types";
import {CourseStatusType, CourseTitleType} from "../../CourseType";

const data: string = getFileContent(__dirname + "/module.md");

export const course: CourseType = {
    title: CourseTitleType.VRF_V2_102,
    path: "vrf102",
    description: data,
    difficulty: 3,
    amountOfTime: '30 minutes',
    status: CourseStatusType.NEW
}

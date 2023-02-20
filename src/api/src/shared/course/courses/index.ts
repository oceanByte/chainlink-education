import chainlinkIntroduction from "./chainlinkIntroduction";
import {CourseList} from "../../../resolvers/course/getAllCourses";
import {CourseChapterType} from "./course.types";
import {Course} from "../Course";
import {COURSES} from "../CourseType";

const courses: CourseChapterType[] = [chainlinkIntroduction]

export const getCourses = (userCourses: Course[] = []): CourseList[] | void => {
    try {
        return courses.map((cc: CourseChapterType): CourseList => {

            const courseType = COURSES.find(c => c.title === cc.course.title);

            const courseItem: CourseList = {
                title: cc.course.title,
                countChapters: cc.chapters.length,
                time: cc.course.amountOfTime,
                difficulty: cc.course.difficulty,
                description: courseType?.description || '',
                status: cc.course.status,
                percent: 0,
            }

            const userCourse: Course | undefined = userCourses.find(uc => cc.course.title === uc.title);

            if (!userCourse) return courseItem;

            const courseProgress = userCourse.progress.length

            courseItem.status = userCourse.status
            courseItem.percent = Math.floor((courseProgress / cc.chapters.length) * 100)

            return courseItem
        })
    } catch (err) {
        throw err
    }
}
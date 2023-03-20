import {CourseList} from "../../../resolvers/course/getAllCourses";
import {ChapterType, CourseChapterType, QuestionType} from "./course.types";
import {Course} from "../Course";
import {COURSES} from "../CourseType";

/** Courses **/
import chainlinkIntroduction from "./chainlinkIntroduction";
import solidity102 from "./solidity102";
import solidityIntroduction from "./solidityIntroduction";
import vrfIntroduction from "./vrfIntroduction";
import vrf102 from "./vrf102";
import {ResponseError} from "../../mongo/ResponseError";
import {CourseWithChapter} from "../../../resolvers/course/getCourseChapter";
import {CourseWithChapters} from "../../../resolvers/course/getCourseById";
import {AnswerInput} from "../../../resolvers/course/validateChapterAnswer";

export const courses: CourseChapterType[] = [
    chainlinkIntroduction,
    solidityIntroduction,
    solidity102,
    vrfIntroduction,
    vrf102
];

type CourseWithChapterOptions = {
    coursePath: string
    chapterPath: string
}

type ValidateAnswerOptions = {
    coursePath: string
    chapterPath: string
    answer: AnswerInput[]
}

type ValidateSolutionOptions = {
    coursePath: string
    chapterPath: string
    solution: string
}

export const getCourses = (userCourses: Course[] = []): CourseList[] => {
    try {
        return courses.map((cc: CourseChapterType): CourseList => {

            const courseType = COURSES.find(c => c.title === cc.course.title);

            const courseItem: CourseList = {
                id: cc.course.path,
                title: cc.course.title,
                countChapters: cc.chapters.length,
                amountOfTime: cc.course.amountOfTime,
                difficulty: cc.course.difficulty,
                description: courseType?.description || '',
                status: cc.course.status,
                progress: [],
                percent: 0,
                urlCourse: cc.course.path,
                chapters: cc.chapters.map(({pathname, name}) => ({pathname, name}))
            }

            const userCourse: Course | undefined = userCourses.find(uc => cc.course.title === uc.title);

            if (!userCourse) return courseItem;

            const courseProgress = userCourse.progress.length

            courseItem.id = userCourse._id.toString()
            courseItem.status = userCourse.status
            courseItem.percent = (courseProgress / cc.chapters.length) * 100
            courseItem.progress = userCourse.progress;

            return courseItem
        })
    } catch (err) {
        throw err
    }
}

export const getCourseByPath = (path: string, userCourses: Course[] = []): any => {
    const course = courses.find((cc: CourseChapterType) => cc.course.path === path)
    if (!course) throw new ResponseError(404, 'Course not found');

    const userCourse: Course | undefined = userCourses.find(uc => uc.title === course.course.title)

    let item: CourseWithChapters = {
        id: '',
        title: course.course.title,
        countChapters: course.chapters.length,
        amountOfTime: course.course.amountOfTime,
        difficulty: course.course.difficulty,
        descriptionCourse: course.course.description,
        status: course.course.status,
        progress: [],
        percent: 0,
        urlCourse: course.course.path,
        urlChapter: course.chapters[0].pathname,
        chapters: course.chapters.map((ch: ChapterType): any => ({
            name: ch.name,
            pathname: ch.pathname,
            description: ch.data.description
        })),
    }


    if (userCourse) {
        item.id = userCourse._id.toString()
        item.progress = userCourse.progress
        item.status = userCourse.status

        const courseProgress = userCourse.progress.length

        item.percent = (courseProgress / course.chapters.length) * 100;

        const pathNames = course.chapters.map((ch: ChapterType): any => (ch.pathname));
        item.urlChapter = pathNames.find((pathName: string) => !userCourse.progress.includes(pathName))
    }

    return item;
}

export const getCourseWithChapter = (options: CourseWithChapterOptions, userCourses: Course[] = []): any => {
    const course = courses.find((cc: CourseChapterType) => cc.course.path === options.coursePath)
    if (!course) throw new ResponseError(404, 'Course not found');

    const chapter = course.chapters.find((ch: ChapterType) => ch.pathname === `/${options.coursePath}/${options.chapterPath}`)
    if (!chapter) throw new ResponseError(404, 'Chapter not found');

    const userCourse: Course | undefined = userCourses.find(uc => uc.title === course.course.title)

    let item: CourseWithChapter = {
        id: '',
        title: course.course.title,
        countChapters: course.chapters.length,
        amountOfTime: course.course.amountOfTime,
        difficulty: course.course.difficulty,
        status: course.course.status,
        progress: [],
        percent: 0,
        urlCourse: course.course.path,
        urlChapter: course.chapters[0].pathname,
        chapter: {
            ...chapter,
            data: {
                ...chapter.data,
                questions: mapQuestions(chapter.data.questions)
            },
        }
    }

    if (userCourse) {
        item.id = userCourse._id.toString()
        item.progress = userCourse.progress;
        item.status = userCourse.status;

        const courseProgress = userCourse.progress.length

        item.percent = (courseProgress / course.chapters.length) * 100;

        const pathNames = course.chapters.map((ch: ChapterType): any => (ch.pathname));
        item.urlChapter = pathNames.find((pathName: string) => !userCourse.progress.includes(pathName))
    }

    return item;
}

export const validateAnswer = (options: ValidateAnswerOptions): boolean => {
    const course = courses.find((cc: CourseChapterType) => cc.course.path === options.coursePath)
    if (!course) throw new ResponseError(404, 'Course not found');

    const chapter = course.chapters.find((ch: ChapterType) => ch.pathname === `/${options.coursePath}/${options.chapterPath}`)
    if (!chapter) throw new ResponseError(404, 'Chapter not found');

    const data = options.answer;

    let answered = true;

    chapter.data.questions.forEach(chapterQuestion => {
        const dataQuestion = data.find(dataQuestion => dataQuestion.question === chapterQuestion.question)

        if (!dataQuestion) {
            answered = false
            return;
        }

        if(dataQuestion.answers.length !== chapterQuestion.responses.length) answered = false;

        dataQuestion.answers.forEach(r => {
            if (!chapterQuestion.responses.includes(r)) answered = false;
        })
    })

    return answered;
}


export const validateSolution = (options: ValidateSolutionOptions): boolean => {
    const course = courses.find((cc: CourseChapterType) => cc.course.path === options.coursePath)
    if (!course) throw new ResponseError(404, 'Course not found');

    const chapter = course.chapters.find((ch: ChapterType) => ch.pathname === `/${options.coursePath}/${options.chapterPath}`)
    if (!chapter) throw new ResponseError(404, 'Chapter not found');

    return chapter.data.solution?.trim() === options.solution.trim();
}

const mapQuestions = (questions: QuestionType[]): QuestionType[] => {
    return questions.map((q: QuestionType): QuestionType => ({
        question: q.question,
        answers: q.answers
    } as QuestionType))
}
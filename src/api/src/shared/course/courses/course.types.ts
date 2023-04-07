export type ChapterType = {
    pathname: string,
    name: string,
    data: ChapterDataType
}

export type ChapterDataType = {
    course: string | undefined,
    video: string | undefined,
    hints: string | undefined,
    description: string | undefined,
    exercise: string | undefined,
    solution: string | undefined,
    questions: QuestionType[],
    supports: any,
    validatorContent: any
}

export type QuestionType = {
    question: string,
    answers: string[]
    responses: string[]
}

export type CourseType = {
    title: string
    path: string
    description: string
    amountOfTime: string
    difficulty: number
    status: string
}

export type CourseChapterType = {
    course: CourseType
    chapters: ChapterType[]
}
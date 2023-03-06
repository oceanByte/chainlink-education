import { GET_CURRENT_CHAPTER_SUCCESS } from "pages/Chapter/Chapter.actions"

const currentChapterInitialState: any = {}

export function currentChapter(state = currentChapterInitialState, action: any): any {
    switch (action.type) {
        case GET_CURRENT_CHAPTER_SUCCESS: {
            return { ...action.payload.course.chapter }
        }
        default:
            return state
    }
}
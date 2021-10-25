import { ChapterData } from 'pages/Chapter/Chapter.controller'

import { course } from '..'
import { data as chapter1 } from './Chapter-1'
import { data as chapter2 } from './Chapter-2'

export const chapterData: ChapterData[] = [
  {
    pathname: `/${course.path}/chapter-1`,
    name: 'Introduction',
    data: chapter1,
  },

  {
    pathname: `/${course.path}/chapter-2`,
    name: 'Introduction 2',
    data: chapter2,
  },
]

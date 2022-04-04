import { ChapterData } from 'pages/Chapter/Chapter.controller'

import { course } from '..'
import { data as chapter1 } from './Chapter-1'
// import { data as chapter2 } from './Chapter-2'
// import { data as chapter3 } from './Chapter-3'
// import { data as chapter4 } from './Chapter-4'
// import { data as chapter5 } from './Chapter-5'
// import { data as chapter6 } from './Chapter-6'
// import { data as chapter7 } from './Chapter-7'

// import { data as chapter8 } from './Chapter-8'
// import { data as chapter9 } from './Chapter-9'

export const chapterData: ChapterData[] = [
  {
    pathname: `/${course.path}/chapter-1`,
    name: 'COMING SOON',
    data: chapter1,
  },
  // {
  //   pathname: `/${course.path}/chapter-8`,
  //   name: 'The Smart Contract Connectivity Problem',
  //   data: chapter8,
  // },
  // {
  //   pathname: `/${course.path}/chapter-9`,
  //   name: 'Centralized Oracles',
  //   data: chapter9,
  // },
]

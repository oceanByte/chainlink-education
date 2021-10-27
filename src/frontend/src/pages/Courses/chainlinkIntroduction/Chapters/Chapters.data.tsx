import { ChapterData } from 'pages/Chapter/Chapter.controller'

import { course } from '..'
import { data as chapter1 } from './Chapter-1'
import { data as chapter2 } from './Chapter-2'
import { data as chapter3 } from './Chapter-3'
import { data as chapter4 } from './Chapter-4'
import { data as chapter5 } from './Chapter-5'
import { data as chapter6 } from './Chapter-6'
import { data as chapter7 } from './Chapter-7'
import { data as chapter8 } from './Chapter-8'

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
  {
    pathname: `/${course.path}/chapter-3`,
    name: 'Introduction 3',
    data: chapter3,
  },
  {
    pathname: `/${course.path}/chapter-4`,
    name: 'Introduction 4',
    data: chapter4,
  },
  {
    pathname: `/${course.path}/chapter-5`,
    name: 'Introduction 5',
    data: chapter5,
  },
  {
    pathname: `/${course.path}/chapter-6`,
    name: 'Introduction 6',
    data: chapter6,
  },
  {
    pathname: `/${course.path}/chapter-7`,
    name: 'Introduction 7',
    data: chapter7,
  },
  {
    pathname: `/${course.path}/chapter-8`,
    name: 'Introduction 8',
    data: chapter8,
  },
]

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
    name: 'What will this course cover?',
    data: chapter1,
  },
  {
    pathname: `/${course.path}/chapter-2`,
    name: 'What are Contracts?',
    data: chapter2,
  },
  {
    pathname: `/${course.path}/chapter-3`,
    name: 'Smart Contracts - The Future',
    data: chapter3,
  },
  {
    pathname: `/${course.path}/chapter-4`,
    name: 'The Smart Contract Connectivity Problem',
    data: chapter4,
  },
  {
    pathname: `/${course.path}/chapter-5`,
    name: 'Chainlink Data Feeds',
    data: chapter5,
  },
  {
    pathname: `/${course.path}/chapter-6`,
    name: 'Conclusion',
    data: chapter6,
  },
  {
    pathname: `/${course.path}/chapter-7`,
    name: 'The Smart Contract Connectivity Problem',
    data: chapter7,
  },
  {
    pathname: `/${course.path}/chapter-8`,
    name: 'Centralized Oracles',
    data: chapter8,
  },
]

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
import { data as chapter9 } from './Chapter-9'
import { data as chapter10 } from './Chapter-10'
import { data as chapter11 } from './Chapter-11'
import { data as chapter12 } from './Chapter-12'
import { data as chapter13 } from './Chapter-13'

export const chapterData: ChapterData[] = [
  {
    pathname: `/${course.path}/chapter-1`,
    name: 'EVM and Turing Completeness',
    data: chapter1,
  },
  {
    pathname: `/${course.path}/chapter-2`,
    name: 'Data Locations',
    data: chapter2,
  },
  {
    pathname: `/${course.path}/chapter-3`,
    name: 'Mappings',
    data: chapter3,
  },
  {
    pathname: `/${course.path}/chapter-4`,
    name: 'Arrays',
    data: chapter4,
  },
  {
    pathname: `/${course.path}/chapter-5`,
    name: 'Structs',
    data: chapter5,
  },
  {
    pathname: `/${course.path}/chapter-6`,
    name: 'Conditional Statements',
    data: chapter6,
  },
  {
    pathname: `/${course.path}/chapter-7`,
    name: 'Loops',
    data: chapter7,
  },
  {
    pathname: `/${course.path}/chapter-8`,
    name: 'Function Modifiers',
    data: chapter8,
  },
  {
    pathname: `/${course.path}/chapter-9`,
    name: 'Error Handling',
    data: chapter9,
  },
  {
    pathname: `/${course.path}/chapter-10`,
    name: 'Events',
    data: chapter10,
  },
  {
    pathname: `/${course.path}/chapter-11`,
    name: 'Inheritance',
    data: chapter11,
  },
  {
    pathname: `/${course.path}/chapter-12`,
    name: 'Constructors',
    data: chapter12,
  },
  {
    pathname: `/${course.path}/chapter-13`,
    name: 'Conclusion',
    data: chapter13,
  },
]

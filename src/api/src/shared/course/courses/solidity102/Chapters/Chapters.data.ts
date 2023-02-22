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

import {ChapterType} from "../../course.types";
import {course} from "../course";

export const chapters: ChapterType[] = [
  {
    pathname: `/${course.path}/chapter-1`,
    name: 'EVM: Sate Machine and Turing Completeness',
    data: chapter1,
  },
  {
    pathname: `/${course.path}/chapter-2`,
    name: 'Storage',
    data: chapter2,
  },
  {
    pathname: `/${course.path}/chapter-3`,
    name: 'Mappings',
    data: chapter3,
  },
  {
    pathname: `/${course.path}/chapter-4`,
    name: 'Conditional statements and loops',
    data: chapter4,
  },
  {
    pathname: `/${course.path}/chapter-5`,
    name: 'Function Modifiers',
    data: chapter5,
  },
  {
    pathname: `/${course.path}/chapter-6`,
    name: 'Errors',
    data: chapter6,
  },
  {
    pathname: `/${course.path}/chapter-7`,
    name: 'Events',
    data: chapter7,
  },
  {
    pathname: `/${course.path}/chapter-8`,
    name: 'Inheritance',
    data: chapter8,
  },
  {
    pathname: `/${course.path}/chapter-9`,
    name: 'Constructors',
    data: chapter9,
  },
  {
    pathname: `/${course.path}/chapter-10`,
    name: 'Conclusion',
    data: chapter10,
  },
]

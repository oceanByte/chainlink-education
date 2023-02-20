import { data as chapter1 } from './Chapter-1'
import { data as chapter2 } from './Chapter-2'
import { data as chapter3 } from './Chapter-3'
import { data as chapter4 } from './Chapter-4'
import { data as chapter5 } from './Chapter-5'
import { data as chapter6 } from './Chapter-6'
import { data as chapter7 } from './Chapter-7'
import {ChapterType} from "../../course.types";
import {course} from "../course";


export const chapters: ChapterType[] = [
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
    name: 'Digital Agreements - What we have today',
    data: chapter3,
  },
  {
    pathname: `/${course.path}/chapter-4`,
    name: 'Smart Contracts - The Future',
    data: chapter4,
  },
  {
    pathname: `/${course.path}/chapter-5`,
    name: 'The Smart Contract Connectivity Problem',
    data: chapter5,
  },
  {
    pathname: `/${course.path}/chapter-6`,
    name: 'Chainlink Data Feeds',
    data: chapter6,
  },
  {
    pathname: `/${course.path}/chapter-7`,
    name: 'Conclusion',
    data: chapter7,
  }
]

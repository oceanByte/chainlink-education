import { data as chapter1 } from './Chapter-1'
import { data as chapter2 } from './Chapter-2'
import { data as chapter3 } from './Chapter-3'
import { data as chapter4 } from './Chapter-4'
import { data as chapter5 } from './Chapter-5'
import { data as chapter6 } from './Chapter-6'
import { data as chapter7 } from './Chapter-7'
import { data as chapter8 } from './Chapter-8'
import {ChapterType} from "../../course.types";
import {course} from "../course";


export const chapters: ChapterType[] = [
  {
    pathname: `/${course.path}/chapter-1`,
    name: 'Introduction to Chainlink Automation',
    data: chapter1,
  },
  {
    pathname: `/${course.path}/chapter-2`,
    name: 'Architecture of Chainlink Automation',
    data: chapter2,
  },
  {
    pathname: `/${course.path}/chapter-3`,
    name: 'Trigger Example for Chainlink Automation',
    data: chapter3,
  },
  {
    pathname: `/${course.path}/chapter-4`,
    name: 'Automating Functions with Chainlink',
    data: chapter4,
  },
  {
    pathname: `/${course.path}/chapter-5`,
    name: 'Fine-Tuning the Chainlink Automation Orchestra',
    data: chapter5,
  },
  {
    pathname: `/${course.path}/chapter-6`,
    name: 'Secure and Verifiable Automation',
    data: chapter6,
  },
  {
    pathname: `/${course.path}/chapter-7`,
    name: 'Real-world Applications of Chainlink Automation',
    data: chapter7,
  },
  {
    pathname: `/${course.path}/chapter-8`,
    name: 'Resources and Continued Learning',
    data: chapter8,
  }
]

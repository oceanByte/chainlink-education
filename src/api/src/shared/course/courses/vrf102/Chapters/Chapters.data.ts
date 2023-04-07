import { data as chapter1 } from './Chapter-1'
import { data as chapter2 } from './Chapter-2'
import { data as chapter3 } from './Chapter-3'
import { data as chapter4 } from './Chapter-4'
import { data as chapter5 } from './Chapter-5'
import { data as chapter6 } from './Chapter-6'
import { data as chapter7 } from './Chapter-7'
import { data as chapter8 } from './Chapter-8'
import {course} from "../course";
import {ChapterType} from "../../course.types";

export const chapters: ChapterType[] = [
  {
    pathname: `/${course.path}/chapter-1`,
    name: 'Introduction',
    data: chapter1,
  },
  {
    pathname: `/${course.path}/chapter-2`,
    name: 'Randomness and Deterministic Machines',
    data: chapter2,
  },
  {
    pathname: `/${course.path}/chapter-3`,
    name: 'Randomness and Blockchains',
    data: chapter3,
  },
  {
    pathname: `/${course.path}/chapter-4`,
    name: 'Goldberg’s Verifiable Random Function',
    data: chapter4,
  },
  {
    pathname: `/${course.path}/chapter-5`,
    name: 'Subscription Manager Contract',
    data: chapter5,
  },
  {
    pathname: `/${course.path}/chapter-6`,
    name: 'VRF On-Chain Considerations',
    data: chapter6,
  },
  {
    pathname: `/${course.path}/chapter-7`,
    name: 'VRF Simultaneous Requests',
    data: chapter7,
  },
  {
    pathname: `/${course.path}/chapter-8`,
    name: 'Conclusion',
    data: chapter8,
  },
]

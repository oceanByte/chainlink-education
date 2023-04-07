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
import {course} from "../course";
import {ChapterType} from "../../course.types";

export const chapters: ChapterType[] = [
  {
    pathname: `/${course.path}/chapter-1`,
    name: 'Solidity',
    data: chapter1,
  },
  {
    pathname: `/${course.path}/chapter-2`,
    name: 'EVM Intro',
    data: chapter2,
  },
  {
    pathname: `/${course.path}/chapter-3`,
    name: 'Pragma Solidity',
    data: chapter3,
  },
  {
    pathname: `/${course.path}/chapter-4`,
    name: 'Naming a Contract',
    data: chapter4,
  },
  {
    pathname: `/${course.path}/chapter-5`,
    name: 'Contract State, Variables and Data Types',
    data: chapter5,
  },
  {
    pathname: `/${course.path}/chapter-6`,
    name: 'Assigning Variables Values',
    data: chapter6,
  },
  {
    pathname: `/${course.path}/chapter-7`,
    name: 'Access Modifiers',
    data: chapter7,
  },
  {
    pathname: `/${course.path}/chapter-8`,
    name: 'Creating Arrays',
    data: chapter8,
  },
  {
    pathname: `/${course.path}/chapter-9`,
    name: 'Reading Array Values',
    data: chapter9,
  },
  {
    pathname: `/${course.path}/chapter-10`,
    name: 'Structs',
    data: chapter10,
  },
  {
    pathname: `/${course.path}/chapter-11`,
    name: 'Functions',
    data: chapter11,
  },
  {
    pathname: `/${course.path}/chapter-12`,
    name: 'Operators: Arithmetic and Relational',
    data: chapter12,
  },
  {
    pathname: `/${course.path}/chapter-13`,
    name: 'Conclusion',
    data: chapter13,
  },
]

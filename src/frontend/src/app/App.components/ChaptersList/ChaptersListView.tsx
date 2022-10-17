import React from 'react'
import { Link } from 'react-router-dom'

import { chaptersByCourse } from '../../../pages/Course/Course.data'
import { ChapterData } from '../../../pages/Chapter/Chapter.controller'

import classnames from 'classnames'

import { Course } from 'shared/course'
import { PublicUser } from 'shared/user/PublicUser'

interface IChaptersListView {
  user?: PublicUser
  pathname: string
  coursePath: string
  course: Course
}

export const ChaptersListView = ({ coursePath, user, pathname, course }: IChaptersListView) => {
  return (
    <>
      {coursePath &&
        chaptersByCourse &&
        chaptersByCourse[coursePath].map((chapter: ChapterData, key: number) => {
          let done = false
          let nextChapter = ''
          const currentPath = `/${coursePath}/chapter-${key + 1}`

          const checkChapter = (progress: string[], chapterPathname: string): string => {
            const sortedArray = progress.sort()

            const lastItem = sortedArray[sortedArray.length - 1]
            let nextChapterUrl = ''

            if (!lastItem && chapterPathname === `/${coursePath}/chapter-1`) {
              return chapterPathname
            }

            if (lastItem) {
              const template = lastItem.slice(0, lastItem.length - 1)
              const numberChapter = +lastItem[lastItem.length - 1]
              nextChapterUrl = `${template}${numberChapter + 1}`
            }

            return nextChapterUrl
          }

          if (user) {
            done = course.progress ? course.progress.indexOf(chapter.pathname) >= 0 : false
            nextChapter = course.progress ? checkChapter(course.progress, chapter.pathname) : ''
          }

          return (
            <Link
              to={currentPath}
              className={classnames('header-chapters__item', done && 'checked', pathname === currentPath && 'current')}
              key={key}
            >
              <span className="header-chapters__item__name">
                <span className="chapter-number">Chapter {key + 1}:</span> <span className="title">{chapter.name}</span>
              </span>
              {done ? (
                <div className={classnames('header-chapters__item__completion', 'completed')}>
                  <span>COMPLETED</span>
                </div>
              ) : (
                <>
                  {user && nextChapter === currentPath ? (
                    <div className="header-chapters__item__completion continue">CONTINUE</div>
                  ) : null}
                </>
              )}
            </Link>
          )
        })}
    </>
  )
}

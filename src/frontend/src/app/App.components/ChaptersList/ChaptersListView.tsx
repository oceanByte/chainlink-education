import React from 'react'
import { Link } from 'react-router-dom'

import classnames from 'classnames'

import { Course } from 'shared/course'
import { PublicUser } from 'shared/user/PublicUser'

interface IChaptersListView {
  user?: PublicUser
  pathname: string
  coursePath: any
  course: Course
}

export const ChaptersListView = ({ coursePath, user, pathname, course: currentCourse }: IChaptersListView) => {
  return (
    <>
      {coursePath && currentCourse.chapters && currentCourse.chapters.map((chapter: { pathname: string, name: string }, key: number) => {
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
          done = Boolean(currentCourse?.progress?.find((i: string) => i === chapter.pathname))
          nextChapter = currentCourse.progress ? checkChapter(currentCourse.progress, chapter.pathname) : ''
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
                {!done && nextChapter === currentPath ? (
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

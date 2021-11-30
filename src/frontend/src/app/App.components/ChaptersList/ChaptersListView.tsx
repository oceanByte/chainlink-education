import React from 'react'
import { Link } from 'react-router-dom'

import { chaptersByCourse } from '../../../pages/Course/Course.data'
import { ChapterData } from '../../../pages/Chapter/Chapter.controller'

import classnames from 'classnames'

import { PublicUser } from 'shared/user/PublicUser'
import { Option } from '../Select/Select.view'

interface IChaptersListView {
  user?: PublicUser
  pathname: string,
  activeCourse: Option,
}

export const ChaptersListView = ({
  activeCourse,
  user,
  pathname,
}: IChaptersListView) => {
  return (
    <>
      {chaptersByCourse[activeCourse.path].map((chapter: ChapterData, key: number) => { 
        let done = false;
        let nextChapter = '';
        const currentPath = `/chainlinkIntroduction/chapter-${key + 1}`;

        const checkChapter = (progress: string[], chapterPathname: string): string => {
          const sortedArray = progress.sort();

          const lastItem = sortedArray[sortedArray.length - 1];
          let nextChapterUrl = '';

          if (!lastItem && chapterPathname === `/chainlinkIntroduction/chapter-1`) {
            return chapterPathname;
          }

          if (lastItem) {
            const template = lastItem.slice(0, lastItem.length - 1);
            const numberChapter = +lastItem[lastItem.length - 1];
            nextChapterUrl = `${template}${numberChapter + 1}`
          }

          return nextChapterUrl;
        } 

        if (user) {
          done = user.progress ? user.progress.indexOf(chapter.pathname) >= 0 : false
          nextChapter = user.progress ? checkChapter(user.progress, chapter.pathname) : ''
        }

        return (
          <Link
            to={currentPath}
            className={classnames(
              'header-chapters__item',
              done && 'checked',
              pathname === currentPath && 'current'
            )}
            key={key}
          >
            <span className="header-chapters__item__name">
              <span>Chapter {key + 1}:</span> <span className="h-font">{chapter.name}</span>
            </span>
            {done ? (
              <div className={classnames('header-chapters__item__completion', 'completed')}>COMPLETED</div>
            ) : (<>
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
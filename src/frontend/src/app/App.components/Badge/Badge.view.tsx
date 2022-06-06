import React from 'react'

import classnames from 'classnames';

import { getClassForCourse } from 'helpers/getInfoForCourse';

import { BadgeStyled } from './Badge.style';

interface IBadgeView {
  percentage: number
  isCompleted?: boolean
  hasLargeBadge?: boolean
  hasMediumBadge?: boolean
  hasSmallBadge?: boolean
  title?: string
}

const DASH_ARRAY_FOR_SMALL = 6 * 30;
const DASH_ARRAY_FOR_MEDIUM = 6 * 51.6666;
const DASH_ARRAY_FOR_LARGE = 6 * 62.3333333;

export const BadgeView = ({
  percentage,
  hasLargeBadge,
  hasMediumBadge,
  hasSmallBadge,
  isCompleted,
  title
}: IBadgeView) => {

  const getDashOfSet = (dashArray: number) => dashArray - dashArray * percentage / 100

  return (
      <BadgeStyled>
        {hasLargeBadge ? (
          <div className={classnames('only-large-badge', isCompleted && 'isCompleted')}>
            <svg width="116" height="125" viewBox="0 0 116 125" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M49.7677 3.66657C54.8608 0.777809 61.1392 0.777809 66.2323 3.66657L105.788 26.1021C110.878 28.9892 114 34.3153 114 40.0645V84.9355C114 90.6848 110.878 96.0108 105.788 98.8979L66.2323 121.333C61.1392 124.222 54.8608 124.222 49.7677 121.333L10.2124 98.8979C5.12211 96.0108 2 90.6848 2 84.9355V40.0645C2 34.3152 5.12211 28.9892 10.2124 26.1021L49.7677 3.66657Z" fill='white' stroke="#D4DBEA" strokeWidth="3"/>
              <path
                d="M49.7677 3.66657C54.8608 0.777809 61.1392 0.777809 66.2323 3.66657L105.788 26.1021C110.878 28.9892 114 34.3153 114 40.0645V84.9355C114 90.6848 110.878 96.0108 105.788 98.8979L66.2323 121.333C61.1392 124.222 54.8608 124.222 49.7677 121.333L10.2124 98.8979C5.12211 96.0108 2 90.6848 2 84.9355V40.0645C2 34.3152 5.12211 28.9892 10.2124 26.1021L49.7677 3.66657Z"
                style={{
                  strokeDasharray: DASH_ARRAY_FOR_LARGE,
                  strokeDashoffset: getDashOfSet(DASH_ARRAY_FOR_LARGE)
                }}
                className="fill"
                stroke="#05C46B"
                strokeWidth="3"
              />
            </svg>
            <div className={classnames('badge', getClassForCourse(title || ''))}></div>
          </div>
        ) : hasMediumBadge ? (
          <div className={classnames('only-medium-badge', isCompleted && 'isCompleted')}>
            <svg width="91" height="100" viewBox="0 0 91 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M38.7325 3.18713C42.6123 0.937624 47.3916 0.937624 51.2714 3.18713L82.2277 21.1355C86.1083 23.3855 88.502 27.5458 88.502 32.0516V67.9484C88.502 72.4542 86.1083 76.6145 82.2277 78.8645L51.2714 96.8129C47.3916 99.0624 42.6123 99.0624 38.7325 96.8129L7.77616 78.8645C3.89562 76.6145 1.50195 72.4542 1.50195 67.9484V32.0516C1.50195 27.5458 3.89562 23.3855 7.77616 21.1355L38.7325 3.18713Z"
                fill='white'
                stroke="#D4DBEA"
                strokeWidth="3"
              />
              <path
                d="M38.7325 3.18713C42.6123 0.937624 47.3916 0.937624 51.2714 3.18713L82.2277 21.1355C86.1083 23.3855 88.502 27.5458 88.502 32.0516V67.9484C88.502 72.4542 86.1083 76.6145 82.2277 78.8645L51.2714 96.8129C47.3916 99.0624 42.6123 99.0624 38.7325 96.8129L7.77616 78.8645C3.89562 76.6145 1.50195 72.4542 1.50195 67.9484V32.0516C1.50195 27.5458 3.89562 23.3855 7.77616 21.1355L38.7325 3.18713Z"
                strokeWidth="3"
                stroke="#05C46B"
                style={{
                  strokeDasharray: DASH_ARRAY_FOR_MEDIUM,
                  strokeDashoffset: getDashOfSet(DASH_ARRAY_FOR_MEDIUM)
                }}
              />
            </svg>
            <div className={classnames('badge', getClassForCourse(title || ''))}></div>
          </div>
        ) : hasSmallBadge ? (
          <div className={classnames('only-small-badge', isCompleted && 'isCompleted')}>
            <svg width="55" height="60" viewBox="0 0 55 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.7047 2.00273C26.0533 0.665757 28.9487 0.665757 31.2972 2.00273L50.2143 12.7718C52.5613 14.1079 54 16.572 54 19.231V40.769C54 43.428 52.5613 45.8921 50.2143 47.2282L31.2972 57.9973C28.9487 59.3342 26.0533 59.3342 23.7047 57.9973L4.78765 47.2282C2.44062 45.8921 1.00195 43.428 1.00195 40.769V19.231C1.00195 16.572 2.44062 14.1079 4.78765 12.7718L23.7047 2.00273Z" fill='white' stroke="#D4DBEA" strokeWidth="2"/>
              <path
                d="M23.7047 2.00273C26.0533 0.665757 28.9487 0.665757 31.2972 2.00273L50.2143 12.7718C52.5613 14.1079 54 16.572 54 19.231V40.769C54 43.428 52.5613 45.8921 50.2143 47.2282L31.2972 57.9973C28.9487 59.3342 26.0533 59.3342 23.7047 57.9973L4.78765 47.2282C2.44062 45.8921 1.00195 43.428 1.00195 40.769V19.231C1.00195 16.572 2.44062 14.1079 4.78765 12.7718L23.7047 2.00273Z"
                stroke="#05C46B"
                strokeWidth="2"
                style={{
                  strokeDasharray: DASH_ARRAY_FOR_SMALL,
                  strokeDashoffset: getDashOfSet(DASH_ARRAY_FOR_SMALL)
                }}
              />
            </svg>
            <div className={classnames('badge', getClassForCourse(title || ''))}></div>
          </div>
        ) : (
          <>
            <div className={classnames('small-badge',isCompleted && 'isCompleted')}>
              <svg width="55" height="60" viewBox="0 0 55 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.7047 2.00273C26.0533 0.665757 28.9487 0.665757 31.2972 2.00273L50.2143 12.7718C52.5613 14.1079 54 16.572 54 19.231V40.769C54 43.428 52.5613 45.8921 50.2143 47.2282L31.2972 57.9973C28.9487 59.3342 26.0533 59.3342 23.7047 57.9973L4.78765 47.2282C2.44062 45.8921 1.00195 43.428 1.00195 40.769V19.231C1.00195 16.572 2.44062 14.1079 4.78765 12.7718L23.7047 2.00273Z" fill='white' stroke="#D4DBEA" strokeWidth="2"/>
                  <path
                    d="M23.7047 2.00273C26.0533 0.665757 28.9487 0.665757 31.2972 2.00273L50.2143 12.7718C52.5613 14.1079 54 16.572 54 19.231V40.769C54 43.428 52.5613 45.8921 50.2143 47.2282L31.2972 57.9973C28.9487 59.3342 26.0533 59.3342 23.7047 57.9973L4.78765 47.2282C2.44062 45.8921 1.00195 43.428 1.00195 40.769V19.231C1.00195 16.572 2.44062 14.1079 4.78765 12.7718L23.7047 2.00273Z"
                    stroke="#05C46B"
                    strokeWidth="2"
                    style={{
                      strokeDasharray: DASH_ARRAY_FOR_SMALL,
                      strokeDashoffset: getDashOfSet(DASH_ARRAY_FOR_SMALL)
                    }}
                  />
                </svg>
                <div className={classnames('badge', getClassForCourse(title || ''))}></div>
            </div>
            <div className={classnames('medium-badge', isCompleted && 'isCompleted')}>
              <svg width="91" height="100" viewBox="0 0 91 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M38.7325 3.18713C42.6123 0.937624 47.3916 0.937624 51.2714 3.18713L82.2277 21.1355C86.1083 23.3855 88.502 27.5458 88.502 32.0516V67.9484C88.502 72.4542 86.1083 76.6145 82.2277 78.8645L51.2714 96.8129C47.3916 99.0624 42.6123 99.0624 38.7325 96.8129L7.77616 78.8645C3.89562 76.6145 1.50195 72.4542 1.50195 67.9484V32.0516C1.50195 27.5458 3.89562 23.3855 7.77616 21.1355L38.7325 3.18713Z"
                  fill='white'
                  stroke="#D4DBEA"
                  strokeWidth="3"
                />
                <path
                  d="M38.7325 3.18713C42.6123 0.937624 47.3916 0.937624 51.2714 3.18713L82.2277 21.1355C86.1083 23.3855 88.502 27.5458 88.502 32.0516V67.9484C88.502 72.4542 86.1083 76.6145 82.2277 78.8645L51.2714 96.8129C47.3916 99.0624 42.6123 99.0624 38.7325 96.8129L7.77616 78.8645C3.89562 76.6145 1.50195 72.4542 1.50195 67.9484V32.0516C1.50195 27.5458 3.89562 23.3855 7.77616 21.1355L38.7325 3.18713Z"
                  strokeWidth="3"
                  stroke="#05C46B"
                  style={{
                    strokeDasharray: DASH_ARRAY_FOR_MEDIUM,
                    strokeDashoffset: getDashOfSet(DASH_ARRAY_FOR_MEDIUM)
                  }}
                />
              </svg>
              <div className={classnames('badge', getClassForCourse(title || ''))}></div>
            </div>
            <div className={classnames('large-badge', isCompleted && 'isCompleted')}>
              <svg width="116" height="125" viewBox="0 0 116 125" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M49.7677 3.66657C54.8608 0.777809 61.1392 0.777809 66.2323 3.66657L105.788 26.1021C110.878 28.9892 114 34.3153 114 40.0645V84.9355C114 90.6848 110.878 96.0108 105.788 98.8979L66.2323 121.333C61.1392 124.222 54.8608 124.222 49.7677 121.333L10.2124 98.8979C5.12211 96.0108 2 90.6848 2 84.9355V40.0645C2 34.3152 5.12211 28.9892 10.2124 26.1021L49.7677 3.66657Z" fill='white' stroke="#D4DBEA" strokeWidth="3"/>
                <path
                  d="M49.7677 3.66657C54.8608 0.777809 61.1392 0.777809 66.2323 3.66657L105.788 26.1021C110.878 28.9892 114 34.3153 114 40.0645V84.9355C114 90.6848 110.878 96.0108 105.788 98.8979L66.2323 121.333C61.1392 124.222 54.8608 124.222 49.7677 121.333L10.2124 98.8979C5.12211 96.0108 2 90.6848 2 84.9355V40.0645C2 34.3152 5.12211 28.9892 10.2124 26.1021L49.7677 3.66657Z"
                  style={{
                    strokeDasharray: DASH_ARRAY_FOR_LARGE,
                    strokeDashoffset: getDashOfSet(DASH_ARRAY_FOR_LARGE)
                  }}
                  className="fill"
                  stroke="#05C46B"
                  strokeWidth="3"
                />
              </svg>
              <div className={classnames('badge', getClassForCourse(title || ''))}></div>
            </div>
          </>
        )}
    </BadgeStyled>
  );
}
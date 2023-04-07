import { Button } from 'app/App.components/Button/Button.controller'
import { Input } from 'app/App.components/Input/Input.controller'
import { ChapterData } from 'pages/Chapter/Chapter.controller'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { State } from 'reducers'
import { Course } from 'shared/course'
import { PublicUser } from 'shared/user/PublicUser'

// prettier-ignore
import { UserBadge, UserBadgeInput, UserCard, UserChapter, UserProgress, UserStyled, UserTitle, UserTitle2 } from './User.style'

type UserViewProps = {
  loading: boolean
  user: PublicUser
  authUser?: PublicUser
  downloadCallback: () => void
  issueNftCallback: () => void
  getCertificateCallback: () => void
  name: string
  accountName: string
  setName: (e: string) => void
  setAccountName: (e: string) => void
}

export const UserView = ({ loading, user, name, setName, getCertificateCallback }: UserViewProps) => {
  const { courseId } = useParams<any>()
  const chapters = useSelector((state: State) => state.courses.find((course: Course) => course.urlCourse === courseId))

  let badgeUnlocked = false
  let counter = 0
  user.progress?.forEach((chapter) => {
    counter++
  })
  if (counter >= 8) badgeUnlocked = true

  return (
    <UserStyled>
      <UserTitle>
        <h1>Your certificate</h1>
      </UserTitle>
      <UserCard>
        <UserBadge badgeUnlocked={badgeUnlocked}>
          {badgeUnlocked ? (
            <>
              <h2>CONGRATS!</h2>) : (
              <UserBadgeInput>
                <Input
                  icon="user"
                  name="name"
                  placeholder="Name on certificate"
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                  value={name}
                  onBlur={() => { }}
                  inputStatus={undefined}
                  errorMessage={undefined}
                />
                <Button
                  type="button"
                  text="Get certificate"
                  icon="login"
                  loading={loading}
                  onClick={() => getCertificateCallback()}
                />
              </UserBadgeInput>
              )
            </>
          ) : (
            <p>To obtain the completion certificate, you need to complete all chapters.</p>
          )}
        </UserBadge>
      </UserCard>

      <UserTitle2>
        <h1>Your progress</h1>
      </UserTitle2>
      <UserCard>
        <UserProgress>
          {chapters.map((chapter: ChapterData) => {
            const done = user.progress && user.progress.indexOf(chapter.pathname) >= 0
            return (
              <Link to={chapter.pathname}>
                <UserChapter key={chapter.pathname} done={done}>
                  {chapter.name}
                  {done && <img alt="done" src="/icons/check.svg" />}
                </UserChapter>
              </Link>
            )
          })}
        </UserProgress>
      </UserCard>
    </UserStyled>
  )
}

UserView.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object,
}

UserView.defaultProps = {
  loading: false,
  user: {
    username: 'Not found',
    karmaTotal: 0,
  },
}

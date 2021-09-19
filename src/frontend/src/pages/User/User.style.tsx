import styled from 'styled-components/macro'
import { AnimatedCard, FadeInFromTop, primaryColor, textColor } from 'styles'

export const UserStyled = styled.div`
  height: 90vh;
  margin: 100px auto 20px auto;
  width: 800px;
  max-width: 90vw;
`

export const ExternalLink = styled.span`
  text-decoration: underline;
  &:hover {
    color: ${primaryColor}
  }
`

export const UserCard = styled(AnimatedCard)`
  padding: 20px;
`

export const UserTitle = styled(FadeInFromTop)`
  color: white;
`

export const UserProgress = styled.div``

export const UserChapter = styled.div<{ done?: boolean }>`
  color: ${(props) => (props.done ? primaryColor : textColor)};
  margin-top: 5px;

  > img {
    height: 17px;
    vertical-align: sub;
    margin-left: 10px;
  }
`

export const UserBadge = styled.div<{ badgeUnlocked: boolean }>``

export const UserTitle2 = styled(FadeInFromTop)`
  color: white;
  margin-top: 30px;
`

export const UserBadgeInput = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 10px;

  > button {
    height: 40px;
  }
`

export const AccountNameInput = styled.div`
  padding-top: 15px !important;
`

export const UserBadgeButtons = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;
`

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
// import testMd from '!raw-loader!./test.md'
//prettier-ignore
import Editor, { ControlledEditor, DiffEditor, monaco } from '@monaco-editor/react'
import { Checkboxes } from 'app/App.components/Checkboxes/Checkboxes.controller'
import { Dialog } from 'app/App.components/Dialog/Dialog.controller'
// import classnames from 'classnames'
import { IAdditionalInfo } from 'helpers/coursesInfo'
import useIsMounted from 'ismounted'
import Markdown from 'markdown-to-jsx'
import { NoAccountModal } from 'modals/NoAccount/NoAccount.view'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { useEffect, useRef, useState, useMemo } from 'react'

// @ts-ignore
import Highlight from 'react-highlight.js'
import { useLocation } from 'react-router-dom'
import { PublicUser } from 'shared/user/PublicUser'
import { backgroundColorLight } from 'styles'
import { useMediaQuery } from 'helpers/useMediaQuery'

import { Button } from '../../app/App.components/Button/Button.controller'
import { Input } from '../../app/App.components/Input/Input.controller'
import ArrowRight from '../../assets/arrow-upright-white.svg'
import { PENDING, RIGHT, WRONG } from './Chapter.constants'
import { IValidator, IValidatorContent, Question } from './Chapter.controller' // TabType
//prettier-ignore
import { BlueParagraph, ButtonBorder, ButtonStyle, ButtonText, ChapterBig, ChapterGrid, ChapterH1, ChapterH2, ChapterH3, ChapterH4, ChapterH5, ChapterQuestions, ChapterTab, ChapterValidator, ChapterValidatorContent, ChapterValidatorContentFailed, ChapterValidatorContentSuccess, ChapterValidatorContentWrapper, ChapterValidatorTitle, ColorWord, ContentWrapp, FormWrapper, LetsStart, ListItemsContainer, MissionContainer, narrativeText, RegularP, Spacer, TextWrapper, VerticalAlign, VideoBox } from './Chapter.style'
import { AnimatedCode, BackgroundContainer, Difficulty, ImageContainer, SpecialCode } from './Chapter.style'
import { Footer } from './Footer/Footer.controller'

monaco
  .init()
  .then((monacoInstance) => {
    monacoInstance.editor.defineTheme('myCustomTheme', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '#029b3a', fontStyle: 'italic' },
        { token: 'keyword', foreground: '#0e15e1' },
        { token: 'number', foreground: '#038c2a' },
        { token: 'string', foreground: '#910303' },
      ],
      colors: {
        'editor.foreground': '#7b7b7b',
        'editor.background': backgroundColorLight,
        'editor.selectionBackground': '#DDF0FF33',
        'editor.lineHighlightBackground': '#FFFFFF08',
        'editorCursor.foreground': '#A7A7A7',
        'editorWhitespace.foreground': '#FFFFFF40',
      },
    })
  })
  .catch((error) => console.error('An error occurred during initialization of Monaco: ', error))

const MonacoReadOnly = ({ children }: any) => {
  const height = children.split('\n').length * 22
  return (
    <div className="editor-wrapper" style={{ marginTop: '10px', borderRadius: '20px' }}>
      <div className="step">
        <p className="step-text">Step 3</p>
      </div>
      <Editor
        height={height}
        value={children}
        language="typescript"
        theme="light"
        options={{
          lineNumbers: false,
          scrollBeyondLastLine: false,
          minimap: { enabled: false },
          scrollbar: { vertical: 'hidden', verticalScrollbarSize: 0, alwaysConsumeMouseWheel: false },
          folding: false,
          readOnly: true,
          fontSize: 14,
          fontFamily: 'Proxima Nova',
          wordWrap: true,
        }}
      />
    </div>
  )
}

const MonacoEditorSupport = ({ support, height }: any) => {
  return (
    <div className="editor-wrapper">
      <div className="step">
        <p className="step-text">Step 2</p>
      </div>
      <Editor
        height={height}
        value={support}
        language="rust"
        theme="vs-dark"
        options={{
          lineNumbers: true,
          scrollBeyondLastLine: false,
          minimap: { enabled: false },
          scrollbar: { vertical: 'hidden', verticalScrollbarSize: 0 },
          folding: true,
          readOnly: true,
          fontSize: 14,
          fontFamily: 'Proxima Nova',
          wordWrap: true,
        }}
      />
    </div>
  )
}

const MonacoEditor = ({ proposedSolution, proposedSolutionCallback, width, height, handleResizeOnClick, showResizeButtons }: any) => {
  return (
    <div className="editor-wrapper">
      <div className="step" >
        <p className="step-text">Step 2</p>
      </div>
      <ControlledEditor
        height={height ? height : '600px'}
        width={width}
        value={proposedSolution}
        language="rust"
        theme="vs-dark"
        // @ts-ignos
        onChange={(_, val) => proposedSolutionCallback(val)}
        options={{
          lineNumbers: true,
          scrollBeyondLastLine: false,
          minimap: { enabled: false },
          scrollbar: { vertical: 'hidden', verticalScrollbarSize: 0 },
          folding: true,
          readOnly: false,
          fontSize: 18,
          fontFamily: 'Proxima Nova',
          wordWrap: true,
          padding: {
            top: 200,
          },
        }}
      />
      {showResizeButtons && (
        <div className="resize">
          <button type='button' onClick={() => handleResizeOnClick('decrease')}>-</button>
          <button type='button' onClick={() => handleResizeOnClick('increase')}>+</button>
        </div>
      )}
    </div>
  )
}

const MonacoDiff = ({ solution, proposedSolution, height }: any) => {
  return (
    <div>
      <div className="step">
        <p className="step-text">Step 2</p>
      </div>
      <DiffEditor
        height={height ? height : '600px'}
        original={proposedSolution}
        modified={solution}
        language="rust"
        // @ts-ignore
        theme="vs-dark"
        options={{
          lineNumbers: true,
          scrollBeyondLastLine: false,
          minimap: { enabled: false },
          scrollbar: { vertical: 'hidden', verticalScrollbarSize: 0 },
          folding: true,
          readOnly: false,
          fontSize: 18,
          fontFamily: 'Proxima Nova',
          renderSideBySide: false,
          wordWrap: true,
        }}
      />
    </div>
  )
}

// Provides user with feedback after incorrect exploration
let triggerAnim = function () {
  const myTry = document.getElementById('try')!
  myTry.classList.remove('tryagain')
  void myTry.offsetWidth
  myTry.classList.add('tryagain')
}

const Validator = ({ validatorState, validateCallback, validatorContent }: IValidator) => (
  <ChapterValidator className={validatorState === RIGHT ? 'ok' : 'no'}>
    <div className="step">
      <p className="step-text">Step 3</p>
    </div>
    {validatorState === PENDING && (
      <ChapterValidatorContentWrapper>
        <ChapterValidatorTitle>{validatorContent.pending.title || 'Awaiting validation'}</ChapterValidatorTitle>
        <ChapterValidatorContent>
          {validatorContent.pending.text || 'Provide your solution above and validate your answer'}
        </ChapterValidatorContent>
        <ButtonStyle>
          {/*<ButtonBorder />*/}
          {/* <img src={ArrowRight} /> */}
          <ButtonText onClick={() => validateCallback()}>
            {validatorContent.pending.textInBtn || 'Validate answer'}
          </ButtonText>
        </ButtonStyle>
      </ChapterValidatorContentWrapper>
    )}
    {validatorState === RIGHT && (
      <ChapterValidatorContentSuccess>
        <ChapterValidatorTitle>{validatorContent.right.title || 'THIS IS CORRECT'}</ChapterValidatorTitle>
        <ChapterValidatorContent>{validatorContent.right.text || 'Go on to the next chapter'}</ChapterValidatorContent>
      </ChapterValidatorContentSuccess>
    )}
    {validatorState === WRONG && (
      <ChapterValidatorContentFailed>
        <ChapterValidatorTitle id={'try'} className={'tryagain'}>
          {validatorContent.wrong.title || 'This is wrong'}
        </ChapterValidatorTitle>
        <ChapterValidatorContent>
          {validatorContent.wrong.text || 'Correct your answer and try again'}
        </ChapterValidatorContent>
        <ButtonStyle>
          <ButtonBorder />
          <ButtonText
            onClick={() => {
              validateCallback()
              triggerAnim()
            }}
          >
            {validatorContent.wrong.textInBtn || 'Try Again'}
          </ButtonText>
        </ButtonStyle>
      </ChapterValidatorContentFailed>
    )}
  </ChapterValidator>
)

const Content = ({ course }: any) => (
  <Markdown
    children={course}
    options={{
      // disableParsingRawHTML: true,
      overrides: {
        p: {
          component: RegularP,
        },
        h1: {
          component: ChapterH1,
        },
        h2: {
          component: ChapterH2,
        },
        h3: {
          component: ChapterH3,
        },
        h4: {
          component: ChapterH4,
        },
        h5: {
          component: ChapterH5,
        },
        code: {
          component: MonacoReadOnly,
        },
        em: {
          component: ChapterBig,
        },
        AnimatedCode: {
          component: AnimatedCode,
        },
        dialog: {
          component: Dialog,
        },
        Button: {
          component: Button,
        },
        FormWrapper: {
          component: FormWrapper,
        },
        Input: {
          component: Input,
        },
        Highlight: {
          component: Highlight,
        },
        Difficulty: {
          component: Difficulty,
        },
        ImageContainer: {
          component: ImageContainer,
        },
        SpecialCode: {
          component: SpecialCode,
        },
        Spacer: {
          component: Spacer,
        },
        narrativeText: {
          component: narrativeText,
        },
        TextWrapper: {
          component: TextWrapper,
        },
        BackgroundContainer: {
          component: BackgroundContainer,
        },
        VerticalAlign: {
          component: VerticalAlign,
        },
        BlueParagraph: {
          component: BlueParagraph,
        },
        ContentWrapp: {
          component: ContentWrapp,
        },
        MissionContainer: {
          component: MissionContainer,
        },
        ColorWord: {
          component: ColorWord,
        },
        ListItemsContainer: {
          component: ListItemsContainer,
        },
        VideoBox: {
          component: VideoBox,
        },
        // FormSevenChapter: {
        //   component: FormSevenChapter
        // }
      },
    }}
  />
)

type ChapterViewProps = {
  validatorState: string
  validateCallback: () => void
  solution: string
  nextChapter: string
  previousChapter: string
  percent: number
  proposedSolution: string
  proposedSolutionCallback: (e: string) => void
  showDiff: boolean
  isAccount: boolean
  closeIsAccountModal: () => void
  course?: string
  tab: string
  setTabOnPage: (currentTab: string) => void
  user?: PublicUser
  supports: Record<string, string | undefined>
  questions: Question[]
  validatorContent: IValidatorContent
  proposedQuestionAnswerCallback: (e: Question[]) => void
  isStarted: boolean
  startedHandler: () => void
  currentCourse: any
  additionalInfo: IAdditionalInfo
}

export const ChapterView = (props: ChapterViewProps) => {

  const {
    validatorState,
    validateCallback,
    solution,
    // isAccount,
    closeIsAccountModal,
    proposedSolution,
    proposedSolutionCallback,
    showDiff,
    course,
    // tab,
    // setTabOnPage,
    user,
    supports,
    questions,
    validatorContent,
    isStarted,
    nextChapter,
    previousChapter,
    percent,
    startedHandler,
    proposedQuestionAnswerCallback,
    currentCourse,
    additionalInfo,
  } = props
  const { pathname } = useLocation()
  const [display, setDisplay] = useState('solution')
  const [editorWidth, setEditorWidth] = useState(0)
  const [editorHeight, setEditorHeight] = useState(0)
  const [isSaveConfirmPopup, setIsSaveConfirmPopup] = useState<any>(null)
  const [minEditorWidth, setMinEditorWidth] = useState<number | null>(null)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const isMounted = useIsMounted()
  const tabletAdaptation = useMediaQuery('1024px')
  const maxEditorWidth = useMemo(() => minEditorWidth && minEditorWidth * 1.4, [minEditorWidth])

  useEffect(() => {
    if (nextChapter === `/${additionalInfo.urlCourse}/chapter-2` && localStorage.getItem('popupConfirm')) {
      setIsSaveConfirmPopup(false)
    } else setIsSaveConfirmPopup(true)

    if (wrapperRef.current) {
      !tabletAdaptation && setMinEditorWidth(wrapperRef.current ? wrapperRef.current.offsetWidth - 30 : 0)
      setEditorWidth(wrapperRef.current ? wrapperRef.current.offsetWidth - 30 : 0)
      setEditorHeight(
        wrapperRef.current!.parentElement!.offsetHeight -
        (wrapperRef.current!.nextElementSibling as HTMLElement).offsetHeight -
        300,
      )
      window.addEventListener('resize', () => {
        if (isMounted.current) {
          !tabletAdaptation && setMinEditorWidth(wrapperRef.current && wrapperRef.current.offsetWidth - 30)
          setEditorWidth(0)
          setEditorWidth(wrapperRef.current ? wrapperRef.current.offsetWidth - 30 : 0)
          setEditorHeight(
            wrapperRef.current!.parentElement!.offsetHeight -
            (wrapperRef.current!.nextElementSibling as HTMLElement).offsetHeight -
            300,
          )
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleResizeOnClick = (resizeType: string) => {
    if (resizeType === 'increase') {
      if (maxEditorWidth && (editorWidth + 10 >= maxEditorWidth)) setEditorWidth(maxEditorWidth)
      else setEditorWidth((currentEditorWidth: number) => currentEditorWidth + 10)

    } else {
      if (minEditorWidth && (editorWidth - 10 <= minEditorWidth)) setEditorWidth(minEditorWidth)
      else setEditorWidth((currentEditorWidth: number) => currentEditorWidth - 10)
    }
  }

  let extension = '.rs'

  const closePopupSaveProcess = () => {
    setIsSaveConfirmPopup(false)
    closeIsAccountModal()
    localStorage.setItem('popupConfirm', 'true')
  }

  return (
    <div className="chapter-info-wrapper">
      {nextChapter === `/${additionalInfo.urlCourse}/chapter-2` && !user && isSaveConfirmPopup ? (
        <NoAccountModal
          open={!user}
          onClose={closePopupSaveProcess}
          buttonTextClose={'Continue without account'}
          buttonText={'Sign up'}
          img={'/images/chap_5_0.png'}
          isImage={false}
          link={'/login'}
          title={''}
          text={'Create an account to save your progress and earn your certificate'}
        />
      ) : null}
      <div className={`chapter-info-container ${!isStarted ? '' : 'isStarted'}`}>
        <div>
          <div className="chapter-block">
            <div className="step">
              <p className="step-text">
                {(currentCourse && currentCourse?.progress?.includes(pathname)) || (user && validatorState === RIGHT)
                  ? 'Chapter completed'
                  : 'Step 1'}
              </p>
            </div>
            {/* <div className="tabs-container">
              <div className={classnames("tab-item", tab === TabType.CONTENT && 'active')} onClick={() => setTabOnPage(TabType.CONTENT)}>Content</div>
              <div className='divider'>|</div>
              <div className={classnames("tab-item", tab === TabType.VIDEO && 'active')} onClick={() => setTabOnPage(TabType.VIDEO)}>Video</div>
              <div className='divider'>|</div>
              <div className={classnames("tab-item", tab === TabType.HINTS && 'active')} onClick={() => setTabOnPage(TabType.HINTS)}>Hints</div>
            </div> */}
            <Content course={course || ''} />
          </div>
        </div>
        <ChapterGrid hasTabs={Object.keys(supports).length > 0}>
          {Object.keys(supports).length > 0 && (
            <div>
              <ChapterTab isSelected={display === 'solution'} onClick={() => setDisplay('solution')}>
                Exercice
              </ChapterTab>
              {Object.keys(supports).map((key, index) => (
                <ChapterTab isSelected={display === key} onClick={() => setDisplay(key)}>
                  {`${key}.${extension}`}
                </ChapterTab>
              ))}
            </div>
          )}
          {isStarted ? (
            <LetsStart>
              <div className="step">
                <p className="step-text">Step 2</p>
              </div>
              <ChapterValidatorContentWrapper>
                <ChapterValidatorTitle>Lorem Ipsum</ChapterValidatorTitle>
                <ChapterValidatorContent>
                  Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries
                </ChapterValidatorContent>
                <ButtonStyle>
                  <img src={ArrowRight} alt="Arrow right" />
                  <ButtonText onClick={() => startedHandler()}>Let’s start!</ButtonText>
                </ButtonStyle>
              </ChapterValidatorContentWrapper>
            </LetsStart>
          ) : (
            <>
              {questions.length > 0 &&
                nextChapter !== `/${additionalInfo.urlCourse}/chapter-${additionalInfo.chapters.length + 1}` ? (
                <ChapterQuestions>
                  <div className="step">
                    <p className="step-text">Step 2</p>
                  </div>
                  {questions.map((question, i) => (
                    <div key={question.question} className="questions-container">
                      <h2>{question.question}</h2>
                      <Checkboxes
                        items={question.answers}
                        onUpdate={(selected) => {
                          const proposedQuestions = questions
                          proposedQuestions[i].proposedResponses = selected
                          proposedQuestionAnswerCallback(proposedQuestions)
                        }}
                      />
                    </div>
                  ))}
                </ChapterQuestions>
              ) : (
                <div className="editor-container" ref={wrapperRef}>
                  {display === 'solution' ? (
                    <div>
                      {showDiff ? (
                        <MonacoDiff
                          height={550}
                          width={editorWidth}
                          solution={solution}
                          proposedSolution={proposedSolution}
                        />
                      ) : (
                        <MonacoEditor
                          width={editorWidth}
                          height={550}
                          proposedSolution={proposedSolution}
                          proposedSolutionCallback={proposedSolutionCallback}
                          handleResizeOnClick={handleResizeOnClick}
                          showResizeButtons={!tabletAdaptation}
                        />
                      )}
                    </div>
                  ) : (
                    <div>
                      <MonacoEditorSupport height={editorHeight} support={supports[display]} />
                    </div>
                  )}
                </div>
              )}
              <Validator
                validatorState={validatorState}
                validateCallback={validateCallback}
                validatorContent={validatorContent}
              />
            </>
          )}
          <Footer
            percent={Math.floor(percent)}
            nextChapter={nextChapter}
            previousChapter={previousChapter}
            additionalInfo={additionalInfo}
          />
        </ChapterGrid>
      </div>
    </div>
  )
}

ChapterView.propTypes = {
  validatorState: PropTypes.string,
  validateCallback: PropTypes.func.isRequired,
  solution: PropTypes.string,
  percent: PropTypes.number,
  nextChapter: PropTypes.string,
  proposedSolution: PropTypes.string,
  showDiff: PropTypes.bool.isRequired,
  isPopup: PropTypes.bool,
  closeIsPopup: PropTypes.func,
  proposedSolutionCallback: PropTypes.func.isRequired,
  course: PropTypes.string,
  supports: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
}

ChapterView.defaultProps = {
  validatorState: PENDING,
  solution: '',
  proposedSolution: '',
}

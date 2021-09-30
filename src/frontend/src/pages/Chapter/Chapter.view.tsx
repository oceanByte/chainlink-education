//prettier-ignore
import Editor, { ControlledEditor, DiffEditor, monaco } from '@monaco-editor/react'
import useIsMounted from 'ismounted'
import Markdown from 'markdown-to-jsx'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import ReactDOM from 'react-dom'

import { useEffect, useRef, useState } from 'react'
// @ts-ignore
import Highlight from 'react-highlight.js'

import { Checkboxes } from 'app/App.components/Checkboxes/Checkboxes.controller'
import { Dialog } from 'app/App.components/Dialog/Dialog.controller'
import { Popup } from 'app/App.components/Popup/Popup.controller'
import { PublicUser } from 'shared/user/PublicUser'
import { backgroundColorLight } from 'styles'

import { Button } from '../../app/App.components/Button/Button.controller'
import { FormSevenChapter } from '../../app/App.components/FormSevenChapter/FormSevenChapter.controller'
import { Input } from '../../app/App.components/Input/Input.controller'
import { PENDING, RIGHT, WRONG } from './Chapter.constants'
import { Question } from './Chapter.controller'
//prettier-ignore
import { ButtonBorder, ButtonStyle, ButtonText, ChapterCourse, ChapterGrid, ChapterH1, ChapterH2, ChapterH3, ChapterH4, ChapterItalic, ChapterMonaco, ChapterQuestions, ChapterStyled, ChapterTab, ChapterValidator, ChapterValidatorContent, ChapterValidatorContentWrapper, ChapterValidatorTitle, FormWrapper, narrativeText, Spacer, TextWrapper, VerticalAlign } from './Chapter.style'
import { AnimatedCode, BackgroundContainer, Difficulty, ImageContainer, SpecialCode } from './Chapter.style'
import ArrowRight from '../../assets/arrow-upright-white.svg'
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import testMd from '!raw-loader!./test.md';

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
    <div style={{ marginTop: '10px', borderRadius: '20px' }}>
      <Editor
        height={height}
        value={children}
        language="typescript"
        theme="vs-dark"
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
    <div>
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

const MonacoEditor = ({ proposedSolution, proposedSolutionCallback, width, height }: any) => {
    return (
    <div>
      <Editor
        height={height ? height : '600px'}
        width={width}
        value={proposedSolution}
        language="rust"
        theme="vs-dark"
        // @ts-ignos
        // onChange={(_, val) => proposedSolutionCallback(val)}
        options={{
          lineNumbers: true,
          scrollBeyondLastLine: false,
          minimap: { enabled: false },
          scrollbar: { vertical: 'hidden', verticalScrollbarSize: 0 },
          folding: true,
          readOnly: false,
          fontSize: 14,
          fontFamily: 'Proxima Nova',
          wordWrap: true,
          padding: {
            top: 200
          }
        }}
      />
    </div>
  )
}

const MonacoDiff = ({ solution, proposedSolution, height }: any) => {
  return (
    <div>
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
          fontSize: 14,
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

const Validator = ({ validatorState, validateCallback }: any) => (
  <ChapterValidator className={validatorState === RIGHT ? 'ok' : 'no'}>
    <div className='step'>
      <p className='step-text'>Step 3</p>
    </div>
    {validatorState === PENDING && (
      <ChapterValidatorContentWrapper>
        <ChapterValidatorTitle>Awaiting validation</ChapterValidatorTitle>
        <ChapterValidatorContent>Type your solution above and validate your answer</ChapterValidatorContent>
        <ButtonStyle>
          {/*<ButtonBorder />*/}
          <img src={ArrowRight} />
          <ButtonText onClick={() => validateCallback()}>Validate mission</ButtonText>
        </ButtonStyle>
      </ChapterValidatorContentWrapper>
    )}
    {validatorState === RIGHT && (
      <ChapterValidatorContentWrapper>
        <ChapterValidatorTitle>EXPLORATION SUCCESSFUL</ChapterValidatorTitle>
        <ChapterValidatorContent>Go on to the next chapter</ChapterValidatorContent>
      </ChapterValidatorContentWrapper>
    )}
    {validatorState === WRONG && (
      <ChapterValidatorContentWrapper>
        <ChapterValidatorTitle id={'try'} className={'tryagain'}>
          Exploration Failed
        </ChapterValidatorTitle>
        <ChapterValidatorContent>Correct your answer and try again</ChapterValidatorContent>
        <ButtonStyle>
          <ButtonBorder />
          <ButtonText
            onClick={() => {
              validateCallback()
              triggerAnim()
            }}
          >
            Try Again
          </ButtonText>
        </ButtonStyle>
      </ChapterValidatorContentWrapper>
    )}
  </ChapterValidator>
)

const Content = ({ course }: any) => (
  <Markdown
    children={course}
    options={{
      // disableParsingRawHTML: true,
      overrides: {
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
        code: {
          component: MonacoReadOnly,
        },
        em: {
          component: ChapterItalic,
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
  proposedSolution: string
  proposedSolutionCallback: (e: string) => void
  showDiff: boolean
  isPopup: boolean
  closeIsPopup: () => void
  course?: string
  user?: PublicUser
  supports: Record<string, string | undefined>
  questions: Question[]
  proposedQuestionAnswerCallback: (e: Question[]) => void
}

export const ChapterView = ({
  validatorState,
  validateCallback,
  solution,
  isPopup,
  closeIsPopup,
  proposedSolution,
  proposedSolutionCallback,
  showDiff,
  course,
  user,
  supports,
  questions,
  nextChapter,
  proposedQuestionAnswerCallback,
}: ChapterViewProps) => {
  const [display, setDisplay] = useState('solution')
  const [editorWidth, setEditorWidth] = useState(0)
  const [editorHeight, setEditorHeight] = useState(0)
  const [isSaveConfirmPopup, setIsSaveConfirmPopup] = useState<any>(null)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const isMounted = useIsMounted()

  useEffect(() => {
    if (nextChapter === '/chainlinkIntroduction/chapter-2' && localStorage.getItem('popupConfirm')) {
      setIsSaveConfirmPopup(false)
    } else setIsSaveConfirmPopup(true)

    if (wrapperRef.current) {
      setEditorWidth(wrapperRef.current ? wrapperRef.current.offsetWidth : 0)
      setEditorHeight(
        wrapperRef.current!.parentElement!.offsetHeight -
          (wrapperRef.current!.nextElementSibling as HTMLElement).offsetHeight -
          300,
      )
      window.addEventListener('resize', () => {
        if (isMounted.current) {
          setEditorWidth(0)
          setEditorWidth(wrapperRef.current ? wrapperRef.current.offsetWidth : 0)
          setEditorHeight(
            wrapperRef.current!.parentElement!.offsetHeight -
              (wrapperRef.current!.nextElementSibling as HTMLElement).offsetHeight -
              300,
          )
        }
      })
    }
  }, [])

  let extension = '.rs'

  const closePopupSaveProcess = () => {
    setIsSaveConfirmPopup(false)
    localStorage.setItem('popupConfirm', 'true')
  }

  const rootElement = document.getElementById('root') as HTMLElement

  const PopupPortal = ReactDOM.createPortal(
    <Popup
      closePopup={closePopupSaveProcess}
      buttonTextClose={'Continue without account'}
      buttonText={'Sign up'}
      img={'/images/chap_5_0.png'}
      isImage={false}
      link={'/login'}
      title={''}
      text={'Create an account to save your progress and earn your certificate'}
    />,
    rootElement,
  )

  return (
    <div className='chapter-info-wrapper'>
      {nextChapter === '/chainlinkIntroduction/chapter-2' && !user && isSaveConfirmPopup ? PopupPortal : null}
      {isPopup ? (
        <Popup
          closePopup={closeIsPopup}
          buttonText={nextChapter !== '/sign-up' ? 'Next Chapter' : 'Get certificate'}
          buttonTextClose={'Close'}
          link={nextChapter}
          img={'/icons/dog.svg'}
          isImage={true}
          title={'Success'}
          text={'Congratulations'}
        />
      ) : null}
      <div className='chapter-info-container'>
        <div className='chapter-block'>
            <div className='step'>
                <p className='step-text'>Step 1</p>
            </div>
          <Content course={testMd || ''} />
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
          {questions.length > 0 && nextChapter !== '/chainlinkIntroduction/chapter-8' ? (
            <ChapterQuestions>
              {questions.map((question, i) => (
                <div key={question.question}>
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
            <div className='editor-container' ref={wrapperRef}>
              {display === 'solution' ? (
                <div>
                  {showDiff ? (
                    <MonacoDiff
                      height={editorHeight}
                      width={editorWidth}
                      solution={solution}
                      proposedSolution={proposedSolution}
                    />
                  ) : (
                    <MonacoEditor
                      width={editorWidth}
                      height={editorHeight}
                      proposedSolution={proposedSolution}
                      proposedSolutionCallback={proposedSolutionCallback}
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
          <Validator validatorState={validatorState} validateCallback={validateCallback} />
        </ChapterGrid>
      </div>
    </div>
  )
}

ChapterView.propTypes = {
  validatorState: PropTypes.string,
  validateCallback: PropTypes.func.isRequired,
  solution: PropTypes.string,
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

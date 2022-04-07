// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
// import testMd from '!raw-loader!./test.md'
//prettier-ignore
import Editor, { ControlledEditor, DiffEditor, monaco } from '@monaco-editor/react'
import { Checkboxes } from 'app/App.components/Checkboxes/Checkboxes.controller'
import { Dialog } from 'app/App.components/Dialog/Dialog.controller'
import useIsMounted from 'ismounted'
import Markdown from 'markdown-to-jsx'
import { NoAccountModal } from 'modals/NoAccount/NoAccount.view'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'

import { Formik } from 'formik';
import classNames from 'classnames'
import * as Yup from 'yup';

// @ts-ignore
import Highlight from 'react-highlight.js'
import { useLocation } from 'react-router-dom'
import { PublicUser } from 'shared/user/PublicUser'
import { backgroundColorLight } from 'styles'

import { Button } from '../../app/App.components/Button/Button.controller'
import { Input } from '../../app/App.components/Input/Input.controller'
import { InputField } from 'app/App.components/Form/InputField/Input.controller';
import ArrowRight from '../../assets/arrow-upright-white.svg'
import { PENDING, RIGHT, WRONG } from './Chapter.constants'
import { IFormValues, Question } from './Chapter.controller'
//prettier-ignore
import { BlueParagraph, ButtonBorder, ButtonStyle, ButtonText, ChapterBig, ChapterGrid, ChapterH1, ChapterH2, ChapterH3, ChapterH4, ChapterH5, ChapterQuestions, ChapterTab, ChapterValidator, ChapterValidatorContent, ChapterValidatorContentFailed, ChapterValidatorContentSuccess, ChapterValidatorContentWrapper, ChapterValidatorTitle, ColorWord, ContentWrapp, FormWrapper, LetsStart, ListItemsContainer, MissionContainer, narrativeText, RegularP, Spacer, TextWrapper, VerticalAlign, VideoBox } from './Chapter.style'
import { AnimatedCode, BackgroundContainer, Difficulty, ImageContainer, SpecialCode } from './Chapter.style'
import { Footer } from './Footer/Footer.controller'
import { ErrorMessage } from './ErrorMessage/ErrorMessage.view'
import { TxList } from './TxList/TxLis.view'

export const ValidationSchema = Yup.object().shape({
  ether: Yup.string()
    .required('This field is required!'),
});

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

const MonacoEditor = ({ proposedSolution, proposedSolutionCallback, width, height }: any) => {
  return (
    <div className="editor-wrapper">
      <div className="step">
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

const Validator = ({ validatorState, validateCallback }: any) => (
  <ChapterValidator className={validatorState === RIGHT ? 'ok' : 'no'}>
    <div className="step">
      <p className="step-text">Step 3</p>
    </div>
    {validatorState === PENDING && (
      <ChapterValidatorContentWrapper>
        <ChapterValidatorTitle>Awaiting validation</ChapterValidatorTitle>
        <ChapterValidatorContent>Provide your solution above and validate your answer</ChapterValidatorContent>
        <ButtonStyle>
          {/*<ButtonBorder />*/}
          {/* <img src={ArrowRight} /> */}
          <ButtonText onClick={() => validateCallback()}>Validate answer</ButtonText>
        </ButtonStyle>
      </ChapterValidatorContentWrapper>
    )}
    {validatorState === RIGHT && (
      <ChapterValidatorContentSuccess>
        <ChapterValidatorTitle>THIS IS CORRECT</ChapterValidatorTitle>
        <ChapterValidatorContent>Go on to the next chapter</ChapterValidatorContent>
      </ChapterValidatorContentSuccess>
    )}
    {validatorState === WRONG && (
      <ChapterValidatorContentFailed>
        <ChapterValidatorTitle id={'try'} className={'tryagain'}>
          This is wrong
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
        }
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
  user?: PublicUser
  supports: Record<string, string | undefined>
  questions: Question[]
  proposedQuestionAnswerCallback: (e: Question[]) => void
  isStarted: boolean
  startedHandler: () => void
  currentCourse: any,
  handleSubmit: (values: IFormValues) => void
  isLoading: boolean
  transactionData: any
  transactionErrorMessage: string | null
}

export const ChapterView = ({
  validatorState,
  validateCallback,
  solution,
  isAccount,
  closeIsAccountModal,
  proposedSolution,
  proposedSolutionCallback,
  showDiff,
  course,
  user,
  supports,
  questions,
  isStarted,
  nextChapter,
  previousChapter,
  percent,
  startedHandler,
  proposedQuestionAnswerCallback,
  currentCourse,
  isLoading,
  handleSubmit,
  transactionData,
  transactionErrorMessage
}: ChapterViewProps) => {
  const { pathname } = useLocation();
  const [display, setDisplay] = useState('solution')
  const [editorWidth, setEditorWidth] = useState(0)
  const [editorHeight, setEditorHeight] = useState(0)
  const [isSaveConfirmPopup, setIsSaveConfirmPopup] = useState<any>(null)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const isMounted = useIsMounted()

  const initialValue: IFormValues = {
    ether: '0.005'
  }

  useEffect(() => {
    if (nextChapter === '/chainlinkIntroduction/chapter-2' && localStorage.getItem('popupConfirm')) {
      setIsSaveConfirmPopup(false)
    } else setIsSaveConfirmPopup(true)

    if (wrapperRef.current) {
      setEditorWidth(wrapperRef.current ? wrapperRef.current.offsetWidth - 30 : 0)
      setEditorHeight(
        wrapperRef.current!.parentElement!.offsetHeight -
          (wrapperRef.current!.nextElementSibling as HTMLElement).offsetHeight -
          300,
      )
      window.addEventListener('resize', () => {
        if (isMounted.current) {
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

  let extension = '.rs'

  const closePopupSaveProcess = () => {
    setIsSaveConfirmPopup(false)
    closeIsAccountModal()
    localStorage.setItem('popupConfirm', 'true')
  }

  return (
    <div className="chapter-info-wrapper">
      {nextChapter === '/chainlinkIntroduction/chapter-2' && !user && isSaveConfirmPopup ? (
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
              <p className="step-text">{
                (currentCourse && currentCourse.progress.includes(pathname)) || (user && validatorState === RIGHT) ?
                'Chapter completed' : 'Step 1'
              }</p>
            </div>
            <Content course={course || ''} />
            {/* <div className="chapter-block__transaction p-font">
              <h3 className='chapter-block__transaction-title'>Challenge</h3>

              {transactionData ? (
                <TxList txs={transactionData} />
              ) : (
                <>
                <div className='chapter-block__transaction-address'>
                  Send 0.005 ETH to this address {process.env.REACT_APP_ADDRESS_RECIPIENT}
                </div>
                <Formik
                  enableReinitialize
                  initialValues={initialValue}
                  validationSchema={ValidationSchema}
                  onSubmit={handleSubmit}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                    }) => (
                      <form className="chapter-block__transaction-form" onSubmit={handleSubmit}>
                        <div className='chapter-block__transaction-form-ether p-font'>
                          <InputField
                            label=""
                            type="text"
                            value={values.ether}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="ether"
                            inputStatus={
                              errors.ether && touched.ether || transactionErrorMessage
                                ? 'error' : !errors.ether && touched.ether 
                                ? 'success' : undefined
                              }
                            errorMessage={errors.ether && touched.ether && errors.ether}
                            isDisabled={false}
                          />
                        </div>
                        <div>
                          <button
                            type='submit'
                            className={classNames(
                            'form-transaction__button',
                            'btn',
                            'btn-primary',
                            )}>
                              {isLoading ? (
                                <span className="loader"></span>
                              ) : (
                                <span className="form-transaction__button__text">SEND ETH</span>
                              )}
                          </button>
                        </div>
                      </form>
                  )}
                </Formik>
                <ErrorMessage message={transactionErrorMessage} />
                </>
              )}
            </div> */}
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
              {questions.length > 0 && nextChapter !== '/chainlinkIntroduction/chapter-8' ? (
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
            </>
          )}
          <Footer percent={Math.floor(percent)} nextChapter={nextChapter} previousChapter={previousChapter} />
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

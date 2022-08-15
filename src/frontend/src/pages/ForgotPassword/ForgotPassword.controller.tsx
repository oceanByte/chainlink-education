import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ForgotPasswordInputs } from 'shared/user/ForgotPassword'

// import { showToaster } from '../../app/App.components/Toaster/Toaster.actions'
// import { ERROR } from '../../app/App.components/Toaster/Toaster.constants'
import { State } from '../../reducers'
import { forgotPassword } from './ForgotPassword.actions'
import { ForgotPasswordView } from './ForgotPassword.view'

export const ForgotPassword = () => {
  const dispatch = useDispatch()
  // const { executeRecaptcha } = useGoogleReCaptcha()
  const loading = useSelector((state: State) => state.loading)

  const forgotPasswordCallback = async (forgotPasswordInputs: ForgotPasswordInputs) => {
    // if (!executeRecaptcha) {
    //   dispatch(showToaster(ERROR, 'Recaptcha not ready', 'Please try again'))
    //   return
    // }
    // const recaptchaToken = await executeRecaptcha('signup')

    dispatch(forgotPassword({ ...forgotPasswordInputs, recaptchaToken: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto totam adipisci, autem eveniet exercitationem hic non placeat, id nulla laboriosam fugiat inventore at veniam magni illo error cupiditate dolore labore, quasi voluptate minus pariatur dolores? Recusandae aliquam quia voluptatum nulla deserunt quibusdam cumque harum accusamus iste magnam pariatur beatae facere natus voluptate ipsum dolorem aut exercitationem blanditiis, necessitatibus, sequi culpa, molestiae similique. Repudiandae recusandae quaerat velit beatae molestias? Sunt recusandae dicta harum quo illo dolore amet esse velit, assumenda eveniet id suscipit aspernatur at dolorem cumque voluptas impedit veniam, exercitationem ipsam odit aliquid ex similique animi omnis. Nam, harum ullam!' }))
  }

  return <ForgotPasswordView forgotPasswordCallback={forgotPasswordCallback} loading={loading} />
}

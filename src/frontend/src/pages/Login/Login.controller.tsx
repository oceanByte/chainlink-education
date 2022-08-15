import { recaptchaRequest } from 'app/App.actions'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginInputs } from 'shared/user/Login'

import Web3 from 'web3';
// import { showToaster } from '../../app/App.components/Toaster/Toaster.actions'
// import { ERROR } from '../../app/App.components/Toaster/Toaster.constants'
import { State } from '../../reducers'
import { login, loginMetaMask } from './Login.actions'
import { LoginView } from './Login.view'

let web3: Web3 | undefined = undefined; // Will hold the web3 instance

export interface Auth {
	accessToken: string;
}

interface IMetaState {
	auth?: Auth;
}

export const Login = () => {
  const dispatch = useDispatch()
  // const { executeRecaptcha } = useGoogleReCaptcha()
  const loading = useSelector((state: State) => state.loading)

  const loginCallback = async (loginInputs: LoginInputs) => {
    dispatch(recaptchaRequest())
    /* if (!executeRecaptcha) {
      dispatch(showToaster(ERROR, 'Recaptcha not ready', 'Please try again'))
      return
    }
    const recaptchaToken = await executeRecaptcha('signup') */

    dispatch(login({ ...loginInputs, recaptchaToken: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto totam adipisci, autem eveniet exercitationem hic non placeat, id nulla laboriosam fugiat inventore at veniam magni illo error cupiditate dolore labore, quasi voluptate minus pariatur dolores? Recusandae aliquam quia voluptatum nulla deserunt quibusdam cumque harum accusamus iste magnam pariatur beatae facere natus voluptate ipsum dolorem aut exercitationem blanditiis, necessitatibus, sequi culpa, molestiae similique. Repudiandae recusandae quaerat velit beatae molestias? Sunt recusandae dicta harum quo illo dolore amet esse velit, assumenda eveniet id suscipit aspernatur at dolorem cumque voluptas impedit veniam, exercitationem ipsam odit aliquid ex similique animi omnis. Nam, harum ullam!' }))
  }

  const handleAuthenticate = ({
		publicAddress,
		signature,
	}: {
		publicAddress: string;
		signature: string;
	}) => {
    dispatch(loginMetaMask({ publicAddress, signature }))
  }
	
	const handleSignMessage = async (res: any) => {
		try {
      const { publicAddress, nonce } = res.user;
			const signature = await web3!.eth.personal.sign(
				`I am signing my one-time nonce: ${nonce}`,
				publicAddress,
				'' // MetaMask will ignore the password argument here
			);

			return { publicAddress, signature };
		} catch (err) {
			throw new Error(
				'You need to sign the message to be able to log in.'
			);
		}
	};

	const handleSignup = (publicAddress: string) =>
		fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
			body: JSON.stringify({ publicAddress }),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		}).then((response) => {
      return response.json()
    });

  const loginMetaMaskCallback = async () => {
    if (!(window as any).ethereum) {
			window.alert('Please install MetaMask first.');
			return;
		}

		if (!web3) {
			try {
				// Request account access if needed
				await (window as any).ethereum.enable();

				// We don't know window.web3 version, so we use our own instance of Web3
				// with the injected provider given by MetaMask
				web3 = new Web3((window as any).ethereum);
			} catch (error) {
				window.alert('You need to allow MetaMask.');
				return;
			}
		}

		const coinbase = await web3.eth.getCoinbase();
		if (!coinbase) {
			window.alert('Please activate MetaMask first.');
			return;
		}

		const publicAddress = coinbase.toLowerCase();

		// Look if user with current publicAddress is already present on backend
		fetch(
			`${process.env.REACT_APP_BACKEND_URL}/users?publicAddress=${publicAddress}`
		)
			.then((response) => response.json())
			// If yes, retrieve it. If no, create it.
			.then(({users}) => users.length ? {user: users[0]} : handleSignup(publicAddress))
			// Popup MetaMask confirmation modal to sign message
			.then(handleSignMessage)
			// Send signature to backend on the /auth route
			.then(handleAuthenticate)
			// Pass accessToken back to parent component (to save it in localStorage)
			.catch((err) => {
				window.alert(err);
			});
  }


  return <LoginView
    loginCallback={loginCallback}
    loginMetaMaskCallback={loginMetaMaskCallback}
    loading={loading}
  />
}

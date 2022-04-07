import * as React from 'react'

import { useDispatch } from 'react-redux'
import Web3 from 'web3';
import { loginMetaMask } from './Login.actions'

let web3: Web3 | undefined = undefined; // Will hold the web3 instance

export const useMetaMask = (isRedirect?: boolean) => {
	const dispatch = useDispatch()
	const handleAuthenticate = ({
		publicAddress,
		signature,
	}: {
		publicAddress: string;
		signature: string;
	}) => {
    dispatch(loginMetaMask({ publicAddress, signature, isRedirect }))
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

		console.log(publicAddress);

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

	return {
		loginMetaMaskCallback
	}
}
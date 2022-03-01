import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Web3 from 'web3';
import { Formik } from 'formik';
import * as Yup from 'yup';

import ArrowRight from '../../assets/arrowRight.png'

import { InputField } from '../../app/App.components/Form/InputField/Input.controller';
import { InputFieldWithEye } from '../../app/App.components/Form/InputFieldWithEye/Input.controller';

import { Row } from './Login.style';
import { Auth } from './Login.controller';

let web3: Web3 | undefined = undefined; // Will hold the web3 instance

const ValidationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string()
    .min(2, 'Username must be longer than or equal to 2 characters')
    .max(50, 'Username must be shorter than or equal to 50 characters')
    .required('This field is required!'),
  password: Yup.string()
    .min(8, 'Password must be longer than or equal to 8 characters')
    .max(50, 'Password must be shorter than or equal to 50 characters')
    .required('This field is required!'),
});

type LoginViewProps = {
  loginCallback: (values: any) => void
  onLoggedIn: (auth: Auth) => void;
  loading: boolean
}

interface IFormInputs {
  usernameOrEmail: string,
  password: string,
}

export const LoginView = ({ loginCallback, onLoggedIn }: LoginViewProps) => {

  const initialValues: IFormInputs = {
    usernameOrEmail: '',
    password: '',
  };

  const [loading, setLoading] = useState(false); // Loading button state

	const handleAuthenticate = ({
		publicAddress,
		signature,
	}: {
		publicAddress: string;
		signature: string;
	}) =>
		fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
			body: JSON.stringify({ publicAddress, signature }),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		}).then((response) => response.json());

	const handleSignMessage = async ({
		publicAddress,
		nonce,
	}: {
		publicAddress: string;
		nonce: string;
	}) => {
		try {
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
		}).then((response) => response.json());

	const handleClick = async () => {
		// Check if MetaMask is installed
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
		setLoading(true);

		// Look if user with current publicAddress is already present on backend
		fetch(
			`${process.env.REACT_APP_BACKEND_URL}/users?publicAddress=${publicAddress}`
		)
			.then((response) => response.json())
			// If yes, retrieve it. If no, create it.
			.then((users) =>
				users.length ? users[0] : handleSignup(publicAddress)
			)
			// Popup MetaMask confirmation modal to sign message
			.then(handleSignMessage)
			// Send signature to backend on the /auth route
			.then(handleAuthenticate)
			// Pass accessToken back to parent component (to save it in localStorage)
			.then(onLoggedIn)
			.catch((err) => {
				window.alert(err);
				setLoading(false);
			});
	};


  const handleSubmit = (values: IFormInputs) => {
    loginCallback(values)
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form-title">Sign in</div>
            <Row>
              <InputField
                label="Email address"
                type="text"
                value={values.usernameOrEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                name="usernameOrEmail"
                inputStatus={
                  errors.usernameOrEmail && touched.usernameOrEmail
                    ? 'error' : !errors.usernameOrEmail && touched.usernameOrEmail 
                    ? 'success' : undefined
                  }
                errorMessage={errors.usernameOrEmail && touched.usernameOrEmail && errors.usernameOrEmail}
                isDisabled={false}
              />
            </Row>
            <Row>
              <InputFieldWithEye
                label="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                inputStatus={
                  errors.password && touched.password
                    ? 'error' : !errors.password && touched.password 
                    ? 'success' : undefined
                  }
                errorMessage={errors.password && touched.password && errors.password}
                isDisabled={false}
              />
            </Row>
            <button className="login-form-sign" type="submit">
              <img src={ArrowRight} alt="arrow" />
              Sign In
            </button>
            <button
              className="login-form-sign metaMask"
              type='button'
              onClick={handleClick}
            >
              <img src={ArrowRight} alt="arrow" />
              Login with MetaMask
            </button>
            <Link to="/forgot-password">
              <div className="login-form-forgot">Forgot your password?</div>
            </Link>
          </form>
        )}
      </Formik>
    </>
  )
}

LoginView.propTypes = {
  loginCallback: PropTypes.func.isRequired,
  loading: PropTypes.bool,
}

LoginView.defaultProps = {
  loading: false,
}

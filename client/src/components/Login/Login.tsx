/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { SyntheticEvent, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../slices/authentication/authSlice';
import { useLoginMutation } from '../../slices/authentication/authApiSlice';
import { validatePassword } from './LoginValidate';
import { validateEmail } from './LoginValidate';
import login_style from './Login.module.css';
declare var google: any;

const Login = () => {
	const emailRef = useRef<HTMLInputElement | null>(null);
	const errRef = useRef<HTMLParagraphElement | null>(null);

	const [email, setEmail] = useState({});
	const [password, setPassword] = useState({});
	const [errMsg, setErrMsg] = useState('');
	const [errorsEmail, setErrorsEmail]: any = useState({});
	const [errorsPassword, setErrorsPassword]: any = useState({});
	const navigate = useNavigate();

	const [login, { isLoading }] = useLoginMutation();
	const dispatch = useDispatch();

	const handleLogin = async (credentials: any) => {
		const userData = await login(credentials).unwrap();
		console.log(userData);
		dispatch(
			setCredentials({
				user: userData.data,
				accessToken: userData.accessToken,
			}),
		);
		setEmail('');
		setPassword('');
		navigate('/welcome');
	};

	const handleCallbackResponse = async (response: any) => {
		console.log('Encoded jwt ID token: ', response);
		handleLogin({ googleToken: response.credential });
	};

	useEffect(() => {
		if (google) {
			google?.accounts?.id?.initialize({
				client_id:
					'210425083362-pkn3890s07pe9r7f0l2s1ev492j4hh13.apps.googleusercontent.com',
				callback: handleCallbackResponse,
			});

			google?.accounts?.id?.renderButton(document.getElementById('signInDiv'), {
				theme: 'outline',
				size: 'large',
			});
		}

		const input = emailRef.current;
		input?.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [email, password]);

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
			handleLogin({ email: email, password });
		} catch (err: any) {
			if (!err?.data) {
				setErrMsg('No Server Response');
			} else if (err.originalStatus === 400) {
				setErrMsg('Missing Username or Password');
			} else if (err.originalStatus === 403) {
				setErrMsg('Wrong Username or Password');
			} else {
				setErrMsg('Login Failed');
			}
		}
		const error = errRef.current;
		error?.focus();
	};

	const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		setErrorsEmail(
			validateEmail({ ...email, [e.target.name]: e.target.value }),
		);
	};
	const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		setErrorsPassword(
			validatePassword({ ...password, [e.target.name]: e.target.value }),
		);
	};
	const spanStyle = { color: 'red', fontSize: '25px' };
	const content = isLoading ? (
		<h1>Loading...</h1>
	) : (
		<React.Fragment>
			<span
				style={spanStyle}
				ref={errRef}
				className={errMsg ? 'errmsg' : 'offscreen'}
				aria-live="assertive"
			>
				{errMsg}
			</span>
			<form onSubmit={handleSubmit}>
				<div className={login_style.form}>
					<h1>Ingresar</h1>
					<fieldset className={login_style.fieldset_login}>
						{/* <label className={login_style.label}>Usuario</label> <br /> */}
						<legend className={login_style.legend}>Email:</legend>
						<input
							type="text"
							ref={emailRef}
							placeholder="Email"
							name="email"
							autoComplete="off"
							required={true}
							onChange={(e) => handleEmailInput(e)}
						/>
						{errorsEmail.email && <p>{errorsEmail.email}</p>}
					</fieldset>{' '}
					<br /> <br />
					<fieldset className={login_style.fieldset_login}>
						{/* <label>Contraseña</label> <br /> */}
						<legend className={login_style.legend}>Contraseña:</legend>
						<input
							type="password"
							placeholder="Contraseña"
							name="password"
							autoComplete="off"
							required={true}
							onChange={(e) => handlePasswordInput(e)}
						/>
						{errorsPassword.password && <p>{errorsPassword.password}</p>}
					</fieldset>{' '}
					<br /> <br />
					<button
						className={login_style.bottom}
						type="submit"
						disabled={
							Object.keys(errorsEmail).length > 0 ||
							Object.keys(errorsPassword).length > 0 ||
							errorsEmail.mail ||
							errorsPassword.password
								? true
								: false
						}
					>
						Iniciar sesion
					</button>
					<div id="signInDiv"></div>
				</div>
				<br />
			</form>
		</React.Fragment>
	);

	return content;
};
export default Login;

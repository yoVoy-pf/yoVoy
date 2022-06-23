/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { SyntheticEvent, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../slices/authentication/authSlice';
import { useLoginMutation, useRecoverPasswordMutation } from '../../slices/authentication/authApiSlice';
import { validatePassword } from './LoginValidate';
import { validateEmail } from './LoginValidate';
import login_style from './Login.module.css';
import Swal from 'sweetalert2'
declare var google: any;

const Login = () => {
	const emailRef = useRef<HTMLInputElement | null>(null);
	const errRef = useRef<HTMLParagraphElement | null>(null);

	const [email, setEmail] = useState({});
	const [password, setPassword] = useState({});
	const [errMsg, setErrMsg] = useState('');
	const [errorsEmail, setErrorsEmail]: any = useState({});
	const [errorsPassword, setErrorsPassword]: any = useState({});
  const [recoverPassword, setRecoverPassword]: any = useState(false)
	const navigate = useNavigate();
  const [localLoading, setLocalLoading] = useState(false);
	const [login] = useLoginMutation();
	const [recoverPasswordQuery] = useRecoverPasswordMutation();
	const dispatch = useDispatch();

	const handleLogin = async (credentials: any) => {
		const Toast = Swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer);
				toast.addEventListener('mouseleave', Swal.resumeTimer);
			},
		});
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
		Toast.fire({
			icon: 'success',
			title: `Bienvenido ${userData.data.name}!`,
		});
	};

	const handleCallbackResponse = async (response: any) => {
		console.log('Encoded jwt ID token: ', response);
		handleLogin({ googleToken: response.credential });
	};

	useEffect(() => {
		try{
        setLocalLoading(false);
        google?.accounts?.id?.initialize({
          client_id:
            '210425083362-pkn3890s07pe9r7f0l2s1ev492j4hh13.apps.googleusercontent.com',
          callback: handleCallbackResponse,
        });
  
        google?.accounts?.id?.renderButton(document.getElementById('signInDiv'), {
          theme: 'outline',
          size: 'large',
        });    
    }catch(err){
      setLocalLoading(true)
      console.log(err)}

		const input = emailRef.current;
		input?.focus();
	}, [localLoading]);

	useEffect(() => {
		setErrMsg('');
	}, [email, password]);

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
      if (recoverPassword) { 
        await recoverPasswordQuery({email});
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: 'success',
          title: `La nueva contraseña fue enviada a su email`,
        });
        setRecoverPassword(false);
        setEmail('');
        setPassword('');
        navigate('/home');
      }
      else { await handleLogin({ email, password }); }
		} catch (err: any) {
			if (!err?.data) {
				setErrMsg('El Server no responde.');
			} else if (err.originalStatus === 400) {
				setErrMsg('Usuario o contraseña incorrectos.');
			} else if (err.originalStatus === 403) {
				setErrMsg('Usuario o contraseña incorrectos.');
			} else {
				setErrMsg('Fallo al ingresar');
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
	const content = localLoading ? (
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
          <fieldset hidden={recoverPassword} className={login_style.fieldset_login}>
						{/* <label>Contraseña</label> <br /> */}
						<legend className={login_style.legend}>Contraseña:</legend>
						<input
							type="password"
							placeholder="Contraseña"
							name="password"
							autoComplete="off"
							onChange={(e) => handlePasswordInput(e)}
						/>
						{errorsPassword.password && <p>{errorsPassword.password}</p>}
					</fieldset>{' '}
           <div hidden={recoverPassword} className={login_style.googleButton} id="signInDiv"></div>
					<button
            type= "submit"
						className={login_style.bottom}
						disabled={
              !recoverPassword &&
              (
                Object.keys(errorsEmail).length > 0 ||
                Object.keys(errorsPassword).length > 0 ||
                errorsEmail.mail ||
                errorsPassword.password
                  ? true
                  : false
              )
						}
					>
              {recoverPassword ? 'Recuperar contraseña' : 'Ingresar'}
					</button>
					<button
						className={login_style.bottom}
            type= 'button'
            onClick={() => setRecoverPassword((pevState: any) => !pevState)}
					>
						{recoverPassword ? 'Volver' : 'Recuperar contraseña'}
					</button>
				</div>
				<br />
			</form>
		</React.Fragment>
	);

	return content;
};
export default Login;

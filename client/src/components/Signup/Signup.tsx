import React, { SyntheticEvent, useEffect, useState, useRef } from "react";
import { useRegisterMutation } from "../../slices/authentication/authApiSlice";
import { useNavigate } from "react-router-dom";
import { validatePassword, validateUser } from './SignupValidate';
import register_style from "./Signup.module.css"
import { useDispatch } from "react-redux";
import { setCredentials } from "../../slices/authentication/authSlice";
declare var google: any


const Signup = () => {
	const userRef = useRef<HTMLInputElement | null>(null);
	const errRef = useRef<HTMLParagraphElement | null>(null);

	const [user, setUser] = useState({});
	const [email, setEmail] = useState({});
	const [password, setPassword] = useState({});
	const [errorsUser, setErrorsUser]: any = useState({});
	const [errorsPassword, setErrorsPassword]: any = useState({});
	const [errMsg, setErrMsg] = useState('');
	const navigate = useNavigate();
  const dispatch = useDispatch();


	const [register] = useRegisterMutation();

  const handleRegister = async (credentials: any) => {
    try{
      const userData : any  = await register(credentials).unwrap();
      if (userData.data){
        dispatch(setCredentials({ user: userData.data, accessToken: userData.accessToken }))
        navigate('/welcome');
      }
      if (userData.error) throw userData.error;
      setUser('');
      setPassword('');
    } catch (error : any) { setErrMsg(error.data)}
  }

  const handleCallbackResponse = async (response: any) => {
    handleRegister({ googleToken: response.credential })
  }

	useEffect(() => {
		const input = userRef.current;
		input?.focus();

    if (google){
      google?.accounts?.id?.initialize({
        client_id: '210425083362-pkn3890s07pe9r7f0l2s1ev492j4hh13.apps.googleusercontent.com',
        callback: handleCallbackResponse
      })
  
      google?.accounts?.id?.renderButton(
        document.getElementById('signInDiv'),
        { theme: 'outline', size: 'large' }
      )
    }

	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [user, password]);

	const onSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
			handleRegister({ email ,name: user, password });
		} catch (err: any) {
			if (!err?.response) {
				setErrMsg('Login Failed');
			}
		}
		const error = errRef.current;
		error?.focus();
	};
	const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser(e.target.value);
		setErrorsUser(validateUser({ ...user, [e.target.name]: e.target.value }));
	};
	const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		setErrorsPassword(
			validatePassword({ ...password, [e.target.name]: e.target.value }),
		);
	};
	const spanStyle = {color : 'red', fontSize:'25px'}
	return (
		<React.Fragment>
			<span
				style={spanStyle}
				ref={errRef}
				className={errMsg ? 'errmsg' : 'offscreen'}
				aria-live="assertive"
			>
				{errMsg}
			</span>
			<form onSubmit={onSubmit}>
				<div className={register_style.form}>

					<h1>Registrarse</h1>
					<fieldset className={register_style.fieldset_signUp}>
					{/* <label>Usuario</label> <br /> */}
					<legend className={register_style.legend}>Nombre</legend>
					<input
						type="text"
						ref={userRef}
						placeholder="nombre"
						name="user"
						autoComplete="off"
						required={true}
						onChange={(e) => handleUserInput(e)}
					/>
					{errorsUser.user && <p>{errorsUser.user}</p>}
					</fieldset> <br /> <br />
					{/* <label>Contraseña</label> <br /> */}
					<fieldset className={register_style.fieldset_signUp}>
					<legend className={register_style.legend}>Email</legend>
					<input
						type="text"
						placeholder="Email"
						name="email"
						autoComplete="off"
						required={true}
						onChange={(e) => handleEmailInput(e)}
					/>
					{errorsPassword.password && <p>{errorsPassword.password}</p>}
					</fieldset> <br /> <br />
					<fieldset className={register_style.fieldset_signUp}>
					<legend className={register_style.legend}>Contraseña</legend>
					<input
						type="password"
						placeholder="Contraseña"
						name="password"
						autoComplete="off"
						required={true}
						onChange={(e) => handlePasswordInput(e)}
					/>
					{errorsPassword.password && <p>{errorsPassword.password}</p>}
					</fieldset> <br /> <br />
					<button className={register_style.bottom}
						type="submit"
						disabled={
							Object.keys(errorsUser).length > 0 ||
								Object.keys(errorsPassword).length > 0 ||
								errorsUser.user ||
								errorsPassword.password
								? true
								: false
						}
					>
						Registrarse
					</button>
          <div id='signInDiv'>

          </div>
				</div>
			</form>
		</React.Fragment>
	);
};

export default Signup;

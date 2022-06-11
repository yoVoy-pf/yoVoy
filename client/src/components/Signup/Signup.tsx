import React, { SyntheticEvent, useEffect, useState, useRef } from "react";
import { useRegisterMutation } from "../../slices/authentication/authApiSlice";
import { useNavigate } from "react-router-dom";
import { validatePassword, validateUser } from './SignupValidate';


const Signup = () => {
	const userRef = useRef<HTMLInputElement | null>(null);
	const errRef = useRef<HTMLParagraphElement | null>(null);

	const [user, setUser] = useState({});
	const [password, setPassword] = useState({});
	const [errorsUser, setErrorsUser]: any = useState({});
	const [errorsPassword, setErrorsPassword]: any = useState({});
	const [errMsg, setErrMsg] = useState('');
	const navigate = useNavigate();


  const [register] = useRegisterMutation();

	useEffect(() => {
		const input = userRef.current;
		input?.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [user, password]);

	const onSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
			await register({ name: user, password });
			setUser('');
			setPassword('');
			navigate('/login');
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
	const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		setErrorsPassword(
			validatePassword({ ...password, [e.target.name]: e.target.value }),
		);
	};

	return (
		<React.Fragment>
			<p
				ref={errRef}
				className={errMsg ? 'errmsg' : 'offscreen'}
				aria-live="assertive"
			>
				{errMsg}
			</p>
			<form onSubmit={onSubmit}>
				<h1>Registrarse</h1>
				<label>Usuario</label> <br />
				<input
					type="text"
					ref={userRef}
					placeholder="Usuario"
					name="user"
					autoComplete="off"
					required={true}
					onChange={(e) => handleUserInput(e)}
				/>
				{errorsUser.user && <p>{errorsUser.user}</p>}
				<br /> <br />
				<label>Contraseña</label> <br />
				<input
					type="password"
					placeholder="Contraseña"
					name="password"
					autoComplete="off"
					required={true}
					onChange={(e) => handlePasswordInput(e)}
				/>
				{errorsPassword.password && <p>{errorsPassword.password}</p>}
				<br /> <br />
				<button
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
				</button>{' '}
				<br />
			</form>
		</React.Fragment>
	);
};

export default Signup;

import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authentication/authSlice";
import { useLoginMutation } from "../../slices/authentication/authApiSlice";
import { selectCurrentToken } from "../../slices/authentication/authSlice";



const Login = () => {
    const userRef = useRef<HTMLInputElement | null>(null);
    const errRef = useRef<HTMLParagraphElement | null>(null);
    const currentToken = useSelector(selectCurrentToken);

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate();
    const location : any = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [login, {isLoading}] = useLoginMutation();
    const dispatch = useDispatch();

    useEffect(() => {
      const input = userRef.current
      input?.focus()
    },[])

    useEffect(() => {
      setErrMsg('')
    },[user,password])

    useEffect(() => {
      if (currentToken) navigate(from, {replace: true})
    },[currentToken, navigate, from])

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const userData = await login({name: user, password}).unwrap()
            console.log(userData)
            dispatch(setCredentials({user: userData.data, accessToken: userData.accessToken}))
            setUser('')
            setPassword('')
            navigate(from,{replace: true})

        } catch (err: any) {
            if (!err?.response){
              setErrMsg('No Server Response')
            } else if (err.status === 400) {
              setErrMsg('Missing Username or Password')
            } else if (err.status === 401){
              setErrMsg('Unauthorized');
            } else{
              setErrMsg('Login Failed')
            }
        }
        const error = errRef.current;
        error?.focus();
    }


  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value)
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  const content = isLoading ? <h1>Loading...</h1> : (
    <React.Fragment>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <form onSubmit={handleSubmit}>
        <h1>Please login</h1>

        <label>User</label> <br />
        <input
          type="text"
          ref={userRef}
          placeholder="Name"
          name='user'
          required
          onChange={handleUserInput}
        /> <br /> <br />
        {/* 
                <label>Email</label>
                <input 
                type="email" 
                placeholder="Email@Email.com" 
                name='email'
                required
                onChange={e => setName(e.target.value)}
                /> <br /> <br />         */}

        <label>Pasword</label> <br />
        <input
          type="password"
          placeholder="Password"
          name='password'
          required
          onChange={handlePasswordInput}
        /> <br /> <br />

        <button type="submit">Iniciar sesion</button> <br />
      </form>
    </React.Fragment>
  )

    return content;
=======
import React, { SyntheticEvent, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../authentication/authSlice';
import { useLoginMutation } from '../../authentication/authApiSlice';
import { validateUser } from './LoginValidate';
import { validatePassword } from './LoginValidate';

const Login = () => {
	const userRef = useRef<HTMLInputElement | null>(null);
	const errRef = useRef<HTMLParagraphElement | null>(null);

	const [user, setUser] = useState({});
	const [password, setPassword] = useState({});
	const [errMsg, setErrMsg] = useState('');
	const [errorsUser, setErrorsUser]: any = useState({});
	const [errorsPassword, setErrorsPassword]: any = useState({});
	const navigate = useNavigate();

	const [login, { isLoading }] = useLoginMutation();
	const dispatch = useDispatch();

	useEffect(() => {
		const input = userRef.current;
		input?.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [user, password]);

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
			e.preventDefault();
			const userData = await login({ name: user, password }).unwrap();
			dispatch(setCredentials({ ...userData, user }));
			setUser('');
			setPassword('');
			navigate('/welcome');
		} catch (err: any) {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.status === 400) {
				setErrMsg('Missing Username or Password');
			} else if (err.status === 401) {
				setErrMsg('Unauthorized');
			} else {
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

	const content = isLoading ? (
		<h1>Loading...</h1>
	) : (
		<React.Fragment>
			<p
				ref={errRef}
				className={errMsg ? 'errmsg' : 'offscreen'}
				aria-live="assertive"
			>
				{errMsg}
			</p>
			<form onSubmit={handleSubmit}>
				<h1>Ingresar</h1>
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
					Iniciar sesion
				</button>
				<br />
			</form>
		</React.Fragment>
	);

	return content;
};
export default Login;

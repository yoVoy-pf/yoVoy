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
};
export default Login;
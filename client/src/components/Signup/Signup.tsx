import React, { SyntheticEvent, useEffect, useState, useRef } from "react";
import { createUser } from "../../services/singupService";
import { useRegisterMutation } from "../../authentication/authApiSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const userRef = useRef<HTMLInputElement | null>(null);
    const errRef = useRef<HTMLParagraphElement | null>(null);

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate();

    const [register,{isLoading}] = useRegisterMutation();

    useEffect(() => {
      const input = userRef.current
      input?.focus()
    }, [])

    useEffect(() => {
      setErrMsg('')
    }, [user, password])

    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try{
          await register({name: user, password})
          setUser('')
          setPassword('')
          navigate('/login')
        }catch(err: any){
          if (!err?.response) {
            setErrMsg('Login Failed')
          }
        }
      const error = errRef.current;
      error?.focus();
    }
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value)
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

    return(
        <React.Fragment>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <form onSubmit={onSubmit}>
                <h1>Please register</h1>

                <label>Name</label> <br />
                <input 
                type="text" 
                ref={userRef}
                placeholder="Name" 
                name='user'
                required
                onChange={handleUserInput}
                /> <br /> <br />

                {/* <label>Email</label>
                <input 
                type="email" 
                placeholder="Email@Email.com" 
                name='email'
                required
                onChange={onInputChange}
                /> <br /> <br /> */}

                <label>Pasword</label> <br />
                <input 
                type="password"
                placeholder="Password"
                name='password'
                required
                onChange={handlePasswordInput}
                /> <br /> <br />

                <button type="submit">Registrarse</button> <br /> 
            </form>
        </React.Fragment>
    )
};

export default Signup;
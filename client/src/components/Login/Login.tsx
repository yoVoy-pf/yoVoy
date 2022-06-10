import React, { SyntheticEvent, useState } from "react";
import loginService from "../../services/loginService";
import NavBar from "../NavBar/NavBar";


const Login = () => {
    const [user, setUser] = useState(null);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const user: any = await loginService.login({
                name,
                password
            })

            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )
            
            console.log(user)
            setUser(user)
            setName('')
            setPassword('')
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <React.Fragment>
            <NavBar/>
            <form onSubmit={handleSubmit}>
                <h1>Please login</h1>

                <label>Name</label> <br />
                <input 
                type="text" 
                placeholder="Name" 
                name='name'
                required
                onChange={e => setName(e.target.value)}
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
                onChange={e => setPassword(e.target.value)}
                /> <br /> <br />

                <button type="submit">Iniciar sesion</button> <br /> 
             </form>
        </React.Fragment>
    )
};
export default Login;
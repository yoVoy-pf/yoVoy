import React, { SyntheticEvent, useState } from "react";
import { createUser } from "../../services/singupService";

const Signup = () => {
    const [user, setUser] = useState({
        name: '',
        password: ''
    })

    const onInputChange = (e:any) => {
        e.preventDefault();
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await createUser(user)
    }
    return(
        <React.Fragment>
            <form onSubmit={onSubmit}>
                <h1>Please register</h1>

                <label>Name</label> <br />
                <input 
                type="text" 
                placeholder="Name" 
                name='name'
                required
                onChange={onInputChange}
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
                onChange={onInputChange}
                /> <br /> <br />

                <button type="submit">Registrarse</button> <br /> 
            </form>
        </React.Fragment>
    )
};

export default Signup;
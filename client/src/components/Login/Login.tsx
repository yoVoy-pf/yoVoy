import React from "react";

const Login = () => {

    return(
        <React.Fragment>
            <form>
                <h1>Please login</h1>

                <label>Name</label> <br />
                <input 
                type="text" 
                placeholder="Name" 
                name='name'
                required
                /> <br /> <br />

                <label>Email</label>
                <input 
                type="email" 
                placeholder="Email@Email.com" 
                name='email'
                required
                /> <br /> <br />        

                <label>Pasword</label> <br />
                <input 
                type="password"
                placeholder="Password"
                name='password'
                required
                /> <br /> <br />

                <button type="submit">Iniciar sesion</button> <br /> 
             </form>
        </React.Fragment>
    )
};
export default Login;
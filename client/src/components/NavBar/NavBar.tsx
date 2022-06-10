import React from "react";
import SearchBar from '../SearchBar/SearchBar';
import { Link } from "react-router-dom";
import image from "../../img/oie_transparent.png"
import "./NavBar.css"
const NavBar = ()=>{
    return(
        <nav className="navbar">
            <Link to="/" className="navbar-log">
                <img src={image} alt="img" />
            </Link>
            <div>
                <SearchBar />
            </div>
            <div>
                <Link to="/login">
                    <button className="navBar-btn-login">Login</button>
                </Link>
                <Link to="/signup">
                    <button className="navBar-btn-register">Registrarse</button>
                </Link>
            </div>
        </nav>
    )
}

export default NavBar;
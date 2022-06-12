import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import image from "../../img/oie_transparent.png"
import "./NavBar.css"
const NavBar = ()=>{
    return(
        <nav className="navbar">
            <Link to="/" className="navbar-log">
                <img src={image} alt="img" />
            </Link>
            <div className="navbar_bg_mid">
                <ul className="navbar_bg_ul">
                    <li className="navbar_bg_li"> <NavLink className="navbar_bg_a" to="/">Home</NavLink> </li>
                    <li className="navbar_bg_li"> <NavLink className="navbar_bg_a" to="#">Sobre Nosotros</NavLink> </li>
                    <li className="navbar_bg_li"> <NavLink className="navbar_bg_a" to="#">Contacto</NavLink> </li>
                    <li className="navbar_bg_li"> <NavLink className="navbar_bg_a" to="/update-event/1">Put event 1</NavLink> </li>
                </ul>
            </div>

            <div className="prueba_btn">
                <Link to="/login">
                    <button className="navBar-btn-login">Iniciar Sesión</button>
                </Link>
                <Link to="/signup">
                    <button className="navBar-btn-register">Registrarse</button>
                </Link>
            </div>
        </nav>
    )
}

export default NavBar;
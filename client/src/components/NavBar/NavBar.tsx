import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import image from "../../img/oie_transparent.png"
import "./NavBar.css"
import { selectCurrentUser } from "../../slices/authentication/authSlice";
import { useSelector } from "react-redux";
import Logout from "../Logout/Logout";
const NavBar = ()=>{
    const currentUser = useSelector(selectCurrentUser)
    const rechargePage = () => {
        if (window.location.href === "http://localhost:3000/") {
            window.location.reload()
        }
    }
    return(
        <nav className="navbar">
            <Link to="/" className="navbar-log" onClick={()=>rechargePage()}>
                <img src={image} alt="img" />
            </Link>
            <div className="navbar_bg_mid">
                <ul className="navbar_bg_ul">
                    <li className="navbar_bg_li"> <NavLink className="navbar_bg_a" to="/" onClick={()=>rechargePage()}>Home</NavLink> </li>
                    <li className="navbar_bg_li"> <NavLink className="navbar_bg_a" to="#">Sobre Nosotros</NavLink> </li>
                    <li className="navbar_bg_li"> <NavLink className="navbar_bg_a" to="#">Contacto</NavLink> </li>
                    <li className="navbar_bg_li"> <NavLink className="navbar_bg_a" to="/welcome">Bienvenido</NavLink> </li>
                </ul>
            </div>
            {!currentUser  && 

            <div className="prueba_btn">
                <Link to="/login">
                    <button className="navBar-btn-login">Iniciar Sesión</button>
                </Link>
                <Link to="/signup">
                    <button className="navBar-btn-register">Registrarse</button>
                </Link>
            </div>
            }
            { currentUser &&
                <div>
                    <Logout/>
                </div>
            }
        </nav>
    )
}

export default NavBar;
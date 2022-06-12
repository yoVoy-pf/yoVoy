import React from "react";
import logout_style from "./Logout.module.css"


const Logout = ()=>{
   
    return(
        <div className={logout_style.bg}>      
                <button  className={logout_style.btn}>Cerrar Sesión</button>
        </div>
    )
}

export default Logout;
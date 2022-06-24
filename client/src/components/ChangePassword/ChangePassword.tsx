/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { SyntheticEvent, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  } from '../../slices/authentication/authApiSlice';
import { validatePassword } from '../Login/LoginValidate';
import login_style from '../Login/Login.module.css';
import Swal from 'sweetalert2'

const ChangePassword = () => {
  const errRef = useRef<HTMLParagraphElement | null>(null);

  const [password, setPassword] = useState({
    password: '',
    newPassword: '',
    verifyPassword: ''
  } as any);
  const [errMsg, setErrMsg] = useState('');
  const [errorsPassword, setErrorsPassword]: any = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg('');
  }, [password]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      if (password.newPassword !== password.verifyPassword) {
        setErrMsg('Las contraseñas no coinciden');
      }
      else if (password.newPassword.length < 6 || password.verifyPassword.length < 6 || password.password.length < 6) {
        setErrMsg('Todos los campos son requeridos');
      }
      else{

      } // query

    } catch (err: any) {
      if (!err?.data) {
        setErrMsg('El Server no responde.');
      } else if (err.originalStatus === 400) {
        setErrMsg('Usuario o contraseña incorrectos.');
      } else if (err.originalStatus === 403) {
        setErrMsg('Usuario o contraseña incorrectos.');
      } else {
        setErrMsg('Fallo al ingresar');
      }
    }
    const error = errRef.current;
    error?.focus();
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({...password, [e.target.name]: e.target.value});
    setErrorsPassword(
      validatePassword({ ...password, [e.target.name]: e.target.value }, e.target.name, {...errorsPassword}),
    );
    if (e.target.name === "verifyPassword") {
      if (e.target.value !== password.newPassword) {
        console.log(`newPassword: ${password.newPassword}, verifyPassword: ${e.target.value}`)
        setErrorsPassword({ ...errorsPassword, verifyPassword: "Las contraseñas no coinciden" })
      } 
    }
    if (e.target.name === 'newPassword') {
      if (e.target.value === password.password) {
        setErrorsPassword({ ...errorsPassword, newPassword: "La contraseña no puede ser igual a la anterior" })
      }
      if (e.target.value !== password.verifyPassword && password.verifyPassword !== '') {
        setErrorsPassword({ ...errorsPassword, verifyPassword: "Las contraseñas no coinciden" })
      }
    }
  };
  const spanStyle = { color: 'red', fontSize: '25px' };
  const content = 
    <React.Fragment>
      <span
        style={spanStyle}
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live="assertive"
      >
        {errMsg}
      </span>
      <form onSubmit={handleSubmit}>
        <div className={login_style.form}>
          <h1>Ingresar</h1>
          <fieldset className={login_style.fieldset_login}>
            {/* <label>Contraseña</label> <br /> */}
            <legend className={login_style.legend}>Contraseña anterior:</legend>
            <input
              type="text"
              placeholder="Contraseña"
              name="password"
              value={password.password}
              autoComplete="off"
              onChange={(e) => handlePasswordInput(e)}
            />
            {errorsPassword.password && <p>{errorsPassword.password}</p>}
          </fieldset>
          <fieldset className={login_style.fieldset_login}>
            {/* <label>Contraseña</label> <br /> */}
            <legend className={login_style.legend}>Nueva contraseña:</legend>
            <input
              type="password"
              placeholder="Nueva Contraseña"
              name="newPassword"
              value={password.newPassword}
              autoComplete="off"
              onChange={(e) => handlePasswordInput(e)}
            />
            {errorsPassword.newPassword && <p>{errorsPassword.newPassword}</p>}
          </fieldset>
          <fieldset className={login_style.fieldset_login}>
            {/* <label>Contraseña</label> <br /> */}
            <legend className={login_style.legend}>Repite la nueva contraseña:</legend>
            <input
              type="password"
              placeholder="Repite la Nueva Contraseña"
              name="verifyPassword"
              value={password.verifyPassword}
              autoComplete="off"
              onChange={(e) => handlePasswordInput(e)}
            />
            {errorsPassword.verifyPassword && <p>{errorsPassword.verifyPassword}</p>}
          </fieldset>
          <button
            type="submit"
            className={login_style.bottom}
            disabled={
                ( Object.keys(errorsPassword).length > 0 ||
                  errorsPassword.password ||
                  errorsPassword.newPassword ||
                  errorsPassword.verifyPassword )
                  ? true
                  : false
            }
            onClick= {() => console.log('ando')}
          >
            Cambiar Contraseña
          </button>
        </div>
        <br />
      </form>
    </React.Fragment>

  return content;
};
export default ChangePassword;

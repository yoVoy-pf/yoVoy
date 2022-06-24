import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import unbanUserStyle from './UnbanUser.module.css';
import Swal from 'sweetalert2';
import {Toast} from '../../utils/alerts'
import { useUnbanUserMutation } from '../../slices/app/usersApiSlice';

const UnbanUser = () => {
  const navigate = useNavigate();
  const [unbanUser] = useUnbanUserMutation();
  const [email, setEmail] = useState('');

  const onInputChange = (e: any) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    Swal.fire({
      title: `¿Está seguro que desea desbanear al usuario ${email}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'orange',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Crear',
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const response : any = await unbanUser({email})
          if (response.error) throw response.error
          Toast.fire({
            title: `Usuario desbaneado!`,
            icon: 'success',
          });
          navigate('/userslist');
        }
      })
      .catch((err) => {
        if (err.originalStatus === 404){
          Toast.fire({
            title: `Usuario no encontrado!`,
            icon: 'error'
          })
        }
      });
  };
  return (
    <div className={unbanUserStyle.fondo}>
      <SideBar />
      <form onSubmit={onSubmit}>
        <div className={unbanUserStyle.form_create_category}>
          <fieldset>
            {/* <label>Nombre de la Categoria</label> <br /> */}
            <legend className={unbanUserStyle.legend_create_category}>
              Email del Usuario
            </legend>
            <input
              type="text"
              placeholder="Email"
              name="email"
              required
              className={unbanUserStyle.input_create_categoty}
              onChange={onInputChange}
              value={email}
            />
          </fieldset>
          <br />
          <button
            className={unbanUserStyle.buttom_create_category}
            type="submit"
          >
            Desbanear usuario
          </button>
        </div>
      </form>
    </div>
  );
};

export default UnbanUser;

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateLocacionMutation } from '../../../slices/app/locationsApiSlice';
import { useGetCitiesQuery } from '../../../slices/app/citiesApiSlice'
import Swal from 'sweetalert2';
import styleCreateLocation from './create-location.module.css'
import SideBar from '../SideBar/SideBar';

const CreateLocation = () => {
    const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer);
			toast.addEventListener('mouseleave', Swal.resumeTimer);
		},
	});
    const { data } = useGetCitiesQuery({ _: '' });
    const navigate = useNavigate();
    const [createLocation] = useCreateLocacionMutation();
    const [locacion, setLocacion] = useState({
        name: "",
        latitude: "",
        length: "",
        address: "",
        cityId: "",
    });
    const onIputChange = (e:any) => {
        e.preventDefault();
        setLocacion({
            ...locacion,
            [e.target.name]: e.target.value,
        })
    }
    const handleSelect =(e:any) => {
        e.preventDefault();
        setLocacion({
          ...locacion,
          cityId: e.target.value
        });

      }
    const onSubmit = async (e: any) => {
		e.preventDefault();
		Swal.fire({
			title: `Crear Locacion ${locacion.name}?`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'orange',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Crear',
		}).then(async (result) => {
			if (result.isConfirmed) {
				Toast.fire({
					title: `Locacion creada!`,
					icon: 'success',
				});
				console.log(locacion.name);
				if (locacion) await createLocation({ 
                    name: locacion.name, 
                    latitude: locacion.latitude, 
                    length: locacion.length, 
                    address: locacion.address, 
                    cityId: locacion.cityId 
                });
				setLocacion({
					name: "",
                    latitude: "",
                    length: "",
                    address: "",
                    cityId: "",
				});
				navigate('/list-locations');
			}
		});
	};
  return (
    <div className={styleCreateLocation.fondo}>
        <SideBar/>
        <form onSubmit={onSubmit}>
            <div className={styleCreateLocation.form_create_category}>
            <fieldset>
                <legend className={styleCreateLocation.legend_create_category}>Nombre:</legend>
                <input 
                type="text" 
                name='name'
                onChange={onIputChange}
                className={styleCreateLocation.input_create_categoty}
                />
            </fieldset>
            <fieldset>
                <legend className={styleCreateLocation.legend_create_category}>Latitud:</legend>
                <input 
                type="text"
                name='latitude' 
                onChange={onIputChange}
                className={styleCreateLocation.input_create_categoty}
                />
            </fieldset>
            <fieldset>
                <legend className={styleCreateLocation.legend_create_category}>Coordenada:</legend>
                <input 
                type="text" 
                name='length'
                onChange={onIputChange}
                className={styleCreateLocation.input_create_categoty}
                />
            </fieldset>
            <fieldset>
                <legend className={styleCreateLocation.legend_create_category}>Direccion:</legend>
                <input 
                type="text" 
                name='address'
                onChange={onIputChange}
                className={styleCreateLocation.input_create_categoty}
                />
            </fieldset>
            <fieldset>
                <legend className={styleCreateLocation.legend_create_category}>Pais:</legend>
                <div>
                <select 
                onChange={(e) => handleSelect(e)} 
                className={styleCreateLocation.form_locations}>
                    {data?.rows.map((city: any) => (
                                <option 
                                key={city.id} 
                                value={city.id}
                                className={styleCreateLocation.form_location}
                                >{city.name}</option>
                            )
                        )
                    }
                </select>
                </div>
            </fieldset>
            <button
            className={styleCreateLocation.buttom_create_category}
            type="submit"
            >
                Crear Locacion
            </button>
            </div>
        </form>
    </div>
  )
}

export default CreateLocation
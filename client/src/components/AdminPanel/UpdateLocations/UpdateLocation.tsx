import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateLocationMutation, useGetLocationQuery } from '../../../slices/app/locationsApiSlice'
import { useGetAllProvinceQuery } from '../../../slices/app/provincesApiSlice'
import Swal from 'sweetalert2';
import SideBar from '../SideBar/SideBar';
import stylelocationUpdate from './update-location.module.css'
import {Toast} from '../../../utils/alerts'

const UpdateLocation = () => {
    const [updateLocation] = useUpdateLocationMutation();
    const navigate = useNavigate();
    const { id }: any = useParams<{ id: string }>();
    const { data: cities } = useGetAllProvinceQuery({ _: '' });
    const { data, error, refetch } = useGetLocationQuery(id);
    const [location, setLocation] = useState({
        name: "",
        latitude: "",
        longitud: "",
        address: "",
        cityId: "",
    })
    useEffect(()=> {
        if(id) {
            if(data) {
                setLocation({ 
                    name: data?.name,
                    latitude: data?.latitude,
                    longitud: data?.longitud,
                    address: data?.address,
                    cityId: data?.city?.name
                })
            }
        } else {
            console.log(error)
        }
    }, [id, data])
    const onChangeName = (e: any) => {
		e.preventDefault();
		setLocation({
			...location,
			[e.target.name]: e.target.value,
		});
	};
    const onChangeLatitude = (e: any) => {
		e.preventDefault();
		setLocation({
			...location,
			[e.target.name]: e.target.value,
		});
	};
    const onChangelongitud = (e: any) => {
		e.preventDefault();
		setLocation({
			...location,
			[e.target.name]: e.target.value,
		});
	};
	const onChangeAddress = (e: any) => {
		e.preventDefault();
		setLocation({
			...location,
			[e.target.name]: e.target.value,
		});
	};
    const handleSelect =(e:any) => {
        e.preventDefault();
        setLocation({
          ...location,
          cityId: e.target.value
        });

      }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			Swal.fire({
				title: 'Seguro que quieres actualizar la Locacion?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: 'orange',
				cancelButtonColor: '#d33',
				cancelButtonText: 'Cancelar',
				confirmButtonText: 'Actualizar',
			}).then(async (result) => {
				if (result.isConfirmed) {
					Toast.fire({
						title: `Locacion actualizada!`,
						icon: 'success',
					});
					id && (await updateLocation({ id: id, updateLocation: location }));
					refetch();
					setLocation({
                        name: "",
                        latitude: "",
                        longitud: "",
                        address: "",
                        cityId: "",
					});
					navigate('/list-locations');
				}
			});
		} catch (error) {
			console.log(error);
		}
	};
    return (
        <div className={stylelocationUpdate.fondo}>
            <SideBar/>
            <form onSubmit={onSubmit}>
                <div className={stylelocationUpdate.form_update_location}>
                <fieldset>
                    <legend className={stylelocationUpdate.legend_update_location}>Nombre:</legend>
                    <input 
                       type="text" 
                       name='name'
                       className={stylelocationUpdate.input_update_location}
                       value={location.name}
                       onChange={onChangeName}
                    />
                </fieldset>
                <fieldset>
                <legend className={stylelocationUpdate.legend_update_location}>Latitud:</legend>
                <input 
                type="text"
                name='latitude' 
                value={location.latitude}
                onChange={onChangeLatitude}
                className={stylelocationUpdate.input_update_location}
                />
                </fieldset>
                <fieldset>
                <legend className={stylelocationUpdate.legend_update_location}>Longitud:</legend>
                <input 
                type="text" 
                name='longitud'
                value={location.longitud}
                onChange={onChangelongitud}
                className={stylelocationUpdate.input_update_location}
                />
                </fieldset>
                <fieldset>
                    <legend className={stylelocationUpdate.legend_update_location}>Dirección:</legend>
                    <input 
                       type="text" 
                       name='address'
                       className={stylelocationUpdate.input_update_location}
                       value={location.address}
                       onChange={onChangeAddress}
                    />
                </fieldset>
                <fieldset>
                <legend className={stylelocationUpdate.legend_update_location}>Provincia:</legend>
                <div>
                <select 
                onChange={(e) => handleSelect(e)} 
                className={stylelocationUpdate.form_locations}>
                    {cities?.rows.map((city: any) => (
                                <option 
                                key={city.id} 
                                value={city.id} 
                                selected={data?.cityId === city.id}
                                className={stylelocationUpdate.form_location}>{city.name}</option>
                            )
                        )
                    }
                </select>
                </div>
                </fieldset>
                <button
                    className={stylelocationUpdate.buttom_update_location}
                    type="submit"
                >
                    Actualizar Locacion
                </button>
                </div>
            </form>
        </div>
    )
}

export default UpdateLocation
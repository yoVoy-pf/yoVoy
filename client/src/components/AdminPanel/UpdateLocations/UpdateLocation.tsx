import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateLocationMutation, useGetLocationQuery } from '../../../slices/app/locationsApiSlice'
import Swal from 'sweetalert2';
import SideBar from '../../SideBar/SideBar';
import stylelocationUpdate from './update-location.module.css'

const UpdateLocation = () => {
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
    const [updateLocation] = useUpdateLocationMutation();
    const navigate = useNavigate();
    const { id }: any = useParams<{ id: string }>();
    const { data, error, refetch } = useGetLocationQuery(id);
    const [location, setLocation] = useState({
        name: '',
        address: '',
        map: '',
        cityId: ''
    })
    console.log('fdsafsadfsdafsafa', data)
    useEffect(()=> {
        if(id) {
            if(data) {
                setLocation({ ...data})
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
	const onChangeAddress = (e: any) => {
		e.preventDefault();
		setLocation({
			...location,
			[e.target.name]: e.target.value,
		});
	};
    const onChangeMap = (e: any) => {
		e.preventDefault();
		setLocation({
			...location,
			[e.target.name]: e.target.value,
		});
	};
    const onChangeCityId = (e: any) => {
		e.preventDefault();
		setLocation({
			...location,
			[e.target.name]: e.target.value,
		});
	};
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
                        name: '',
                        address: '',
                        map: '',
                        cityId: ''
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
                    <legend className={stylelocationUpdate.legend_update_location}>Map:</legend>
                    <input 
                       type="text" 
                       name='map'
                       className={stylelocationUpdate.input_update_location}
                       value={location.map}
                       onChange={onChangeMap}
                    />
                </fieldset>
                <fieldset>
                    <legend className={stylelocationUpdate.legend_update_location}>cityId:</legend>
                    <input 
                       type="text" 
                       name='cityId'
                       className={stylelocationUpdate.input_update_location}
                       value={location.cityId}
                       onChange={onChangeCityId}
                    />
                </fieldset>
                <button
                    className={stylelocationUpdate.buttom_update_location}
                    type="submit"
                >
                    Actualizar Usuario
                </button>
                </div>
            </form>
        </div>
    )
}

export default UpdateLocation
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	useGetOrganizationQuery,
	useUpdateOrganizationMutation,
} from '../../../slices/app/organizationApiSlice';
import SideBar from '../SideBar/SideBar';
import styleUpdateOrganization from './update-organization.module.css';
import Swal from 'sweetalert2';
import {Toast} from '../../../utils/alerts';

const UpdateOrganization = () => {
	const [updateOrganization] = useUpdateOrganizationMutation();
	const { id }: any = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { data, error, refetch } = useGetOrganizationQuery(id);
	const [organization, setOrganization] = useState({ name: '' });

	useEffect(() => {
		if (id) {
			if (data) {
				setOrganization({ ...data });
			}
		} else {
			console.log(error);
		}
	}, [id, data]);

	const onChange = (e: any) => {
		e.preventDefault();
		setOrganization({
			...organization,
			[e.target.name]: e.target.value,
		});
	};
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			Swal.fire({
				title: 'Seguro que quieres actualizar la Organización?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: 'orange',
				cancelButtonColor: '#d33',
				cancelButtonText: 'Cancelar',
				confirmButtonText: 'Actualizar',
			}).then(async (result) => {
				if (result.isConfirmed) {
					Toast.fire({
						title: `Organización actualizada!`,
						icon: 'success',
					});
					id &&
						(await updateOrganization({
							id: id,
							updateOrganization: organization,
						}));
					refetch();
					setOrganization({
						name: '',
					});
					navigate('/organization-list');
				}
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className={styleUpdateOrganization.fondo}>
			<SideBar />
			<form onSubmit={onSubmit}>
				<div className={styleUpdateOrganization.form_organization}>
					<fieldset>
						<legend>Nombre de la Organizacion:</legend>
						<input
							type="text"
							name="name"
							className={styleUpdateOrganization.inputs_organization}
							value={organization.name}
							onChange={onChange}
						/>
					</fieldset>
					<button
						className={styleUpdateOrganization.button_organization}
						type="submit"
					>
						Actualizar Organizacion
					</button>
				</div>
			</form>
		</div>
	);
};

export default UpdateOrganization;

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreateOrganizationMutation } from '../../slices/app/organizationApiSlice';
import { selectCurrentUser } from '../../slices/authentication/authSlice';
import SideBar from '../AdminPanel/SideBar/SideBar';
import styleCreateOrganization from './create-organization.module.css';
import Swal from 'sweetalert2';

const CreateOrganization = () => {
	const navigate = useNavigate();
	const currentUser: any = useSelector(selectCurrentUser);
	const [createOrganization] = useCreateOrganizationMutation();
	const [organization, setOrganization] = useState({
		name: '',
	});

	const onInputChange = (e: any) => {
		e.preventDefault();
		setOrganization({
			...organization,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = async (e: any) => {
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
		e.preventDefault();
		console.log(organization.name);
		if (organization)
			await createOrganization({ organization: organization.name });
		setOrganization({
			name: '',
		});
		Swal.fire({
			title: `Crear Organización ${organization.name}?`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'orange',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Crear',
		}).then(async (result) => {
			navigate('/welcome');
			if (result.isConfirmed) {
				Toast.fire({
					icon: 'success',
					title: `Organización ${organization.name} creada con éxito!`,
				});
				window.location.reload();
			}
		});
	};
	return (
		<div>
			{currentUser.rolesId[2] && <SideBar />}
			{currentUser && (
				<form onSubmit={onSubmit}>
					<div className={styleCreateOrganization.form_create_organization}>
						<fieldset>
							<legend
								className={styleCreateOrganization.legend_create_organization}
							>
								Nombre de la Organizacion:
							</legend>
							<input
								type="text"
								placeholder="Nombre"
								name="name"
								required
								className={styleCreateOrganization.input_create_organization}
								onChange={onInputChange}
								value={organization.name}
							/>
						</fieldset>{' '}
						<br />
						<button
							className={styleCreateOrganization.buttom_create_organization}
							type="submit"
						>
							¡Crear Organizacion!
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default CreateOrganization;

import {
	useGetOrganizationsQuery,
	useDeleteOrganizationMutation,
} from '../../slices/app/organizationApiSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styleListOrganization from './organization-list.module.css';
import SideBar from '../SideBar/SideBar';
import Swal from 'sweetalert2';

const OrganizationList = () => {
	const [deleteOrganization] = useDeleteOrganizationMutation();
	const navigate = useNavigate();
	const {
		data: organizations,
		isLoading,
		isSuccess,
		isError,
		error,
		refetch,
	} = useGetOrganizationsQuery({ _: '' }, { refetchOnMountOrArgChange: true });

	const handleDelete = async (id: any) => {
		// if (window.confirm('Seguro que quieres eliminar esta organizacion?')) {
		// 	await deleteOrganization(id);
		// 	refetch();
		// 	alert('Organización eliminada correactamente');
		// }
		Swal.fire({
			title: 'Esta seguro de eliminar la Organización?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'orange',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar',
		}).then(async (result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: 'Organización Eliminada!',
					icon: 'success',
				});
				await deleteOrganization(id);
				refetch();
			}
		});
	};

	let content = <span></span>;
	if (isLoading) {
		content = <p>Cargando...</p>;
	} else if (isSuccess) {
		content = (
			<div>
				<SideBar />
				<div className={styleListOrganization.table_title}>
					<h1 className={styleListOrganization.table_title_style}>
						Lista de Organizaciones
					</h1>
				</div>
				<table className={styleListOrganization.table_organizations}>
					<tbody className={styleListOrganization.thead_dark}>
						<tr>
							<th style={{ textAlign: 'center' }}>ID</th>
							<th style={{ textAlign: 'center' }}>Name</th>
							<th style={{ textAlign: 'center' }}>Action</th>
						</tr>
						<div></div>

						{organizations?.map((organization: any, index: any) => {
							return (
								<tr key={organization.id}>
									<th scope="row" style={{ textAlign: 'center' }}>
										{index + 1}
									</th>
									<td className={styleListOrganization.th_organizations}>
										{organization.name}
									</td>
									<td className={styleListOrganization.th_organizations}>
										<Link
											to={`/update-organization/${organization.id}`}
											className={styleListOrganization.buttom}
										>
											<button
												className={styleListOrganization.buttom_style_left}
											>
												Editar
											</button>
										</Link>
										<button
											className={styleListOrganization.buttom_style_right}
											onClick={() => handleDelete(organization.id)}
										>
											Eliminar
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	} else if (isError) {
		content = <p>{JSON.stringify(error)}</p>;
	}
	return content;
};

export default OrganizationList;

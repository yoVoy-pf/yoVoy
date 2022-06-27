import React from 'react';
import { Link } from 'react-router-dom';
import styleLocations from './locations-list.module.css';
import Swal from 'sweetalert2';
import SideBar from '../SideBar/SideBar';
import usePagination from '../../../hooks/usePagination/usePagination';
import PageButtons from '../../PageButtons/PageButtons';
import { useSelector } from 'react-redux';
import { selectAllLocations } from '../../../slices/adminPanelSlice';

const LocationsList = () => {
  const locations = useSelector(selectAllLocations)
  const pagination = usePagination(10, 'locations');
  


    const handleDelete = async (id: any) => {
		Swal.fire({
			title: 'Esta seguro de eliminar la Locacion?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'orange',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar',
		}).then(async (result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: 'Locacion Eliminada!',
					icon: 'success',
				});
				// await deleteOrganization(id);
				pagination.refresh();
			}
		});
	};
		const content = (
			<div className={styleLocations.fondo}>
                <SideBar/>
            <div className={styleLocations.table_title}>
            <h1 className={styleLocations.table_title_style}>Lista de Locaciones</h1>
            </div>
        <PageButtons page={pagination.page} limit={pagination.limit} pageButtonHandler={pagination.pageButtonHandler} />
        <table className={styleLocations.table_categories}>
            <thead>
                <tr>
                <th style={{ textAlign: "center" }}>ID</th>
                <th style={{ textAlign: "center" }}>Name</th>
                <th style={{ textAlign: "center" }}>Address</th>
                <th style={{ textAlign: "center" }}>City</th>
                <th style={{ textAlign: "center" }}>Acciones</th>
                </tr>
            </thead>

            <tbody>
                { 
                        locations?.rows?.map((location: any, index: any) => {
                            return (
                            <tr>
                                <th scope="row" style={{ textAlign: "center", backgroundColor: '#000450'}}>{location.id}</th>
                                <td className={styleLocations.th_categories}>{location.name}</td>
                                <td className={styleLocations.th_categories}>{location.address}</td>
                                <td className={styleLocations.th_categories}>{location.city.name}</td>
                                <td className={styleLocations.th_organizations}>
                                <Link to={`/update-location/${location.id}`} className={styleLocations.buttom}>
                                    <button className={styleLocations.buttom_style_left}>Editar</button>
                                </Link>
                                </td>
                            </tr>
                            );
                            })
                }
                </tbody>
            </table>
        </div>
		);
	return content;
}

export default LocationsList
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetCategoriesQuery, useDeleteCategoryMutation } from '../../../slices/app/categoriesApiSlice';
import SideBar from '../SideBar/SideBar';
import styleCategories from './categories-list.module.css';
import Swal from 'sweetalert2';

const CategoriesList = () => {
    const {
		data: categories,
		isLoading,
		isSuccess,
		isError,
		error,
		refetch,
	} = useGetCategoriesQuery({ _: '' }, { refetchOnMountOrArgChange: true });
    const [deleteCategory] = useDeleteCategoryMutation();
    const handleDelete = async (id: any) => {
		// if (window.confirm('Seguro que quieres eliminar esta organizacion?')) {
		// 	await deleteOrganization(id);
		// 	refetch();
		// 	alert('Organización eliminada correactamente');
		// }
		Swal.fire({
			title: 'Esta seguro de eliminar la Categoria?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'orange',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar',
		}).then(async (result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: 'Categoria Eliminada!',
					icon: 'success',
				});
				await deleteCategory(id);
				refetch();
			}
		});
	};

    let content = <span></span>;
    if(isLoading){
        content = <p>Cargando...</p>;
    } else if (isSuccess) {
		content = (
			<div className={styleCategories.fondo}>
                <SideBar/>
            <div className={styleCategories.table_title}>
            <h1 className={styleCategories.table_title_style}>Lista de Categorías</h1>
              <Link to={`/create-category`} className={styleCategories.buttom}>
                <button className={styleCategories.buttom_style}>Crear Cateogoría</button>
              </Link>
            </div>
        <table className={styleCategories.table_categories}>
            <thead>
                <tr>
                <th style={{ textAlign: "center" }}>ID</th>
                <th style={{ textAlign: "center" }}>Nombre</th>
                <th style={{ textAlign: "center" }}>Acciones</th>
                </tr>
            </thead>
            <div></div>
            <tbody>
                { 
                        categories?.rows?.map((category: any, index: any) => {
                            return (
                            <tr>
                                <th scope="row" style={{ textAlign: "center", backgroundColor: '#000450'}}>{category?.id}</th>
                                <td className={styleCategories.th_categories}>{category?.name}</td>
                                <td className={styleCategories.th_organizations}>
                                <Link to={`/update-category/${category?.id}`} className={styleCategories.buttom}>
                                    <button className={styleCategories.buttom_style_left}>Editar</button>
                                </Link>
                                <button
                                className={styleCategories.buttom_style_right}
                                onClick={()=> handleDelete(category?.id)}
                                >
                                    Eliminar
                                </button>
                                </td>
                            </tr>
                            );
                            })
                }
                </tbody>
            </table>
        </div>
		);
	} else if (isError) {
		content = <p>{JSON.stringify(error)}</p>;
	}
	return content;
}

export default CategoriesList
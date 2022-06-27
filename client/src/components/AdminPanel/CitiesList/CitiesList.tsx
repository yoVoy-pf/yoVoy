import React from 'react'
import { Link } from 'react-router-dom';
import { useGetCitiesQuery } from '../../../slices/app/citiesApiSlice'
import SideBar from '../SideBar/SideBar';
import styleCities from './cities-list.module.css'

const CitiesList = () => {
    const {
		data: cities,
		isLoading,
		isSuccess,
		isError,
		error,
		refetch,
	} = useGetCitiesQuery({ _: '' }, { refetchOnMountOrArgChange: true });
    console.log('sadfasdfasdfasfasdf',cities)
    let content = <span></span>;
    if(isLoading){
        content = <p>Cargando...</p>;
    } else if (isSuccess) {
		content = (
			<div className={styleCities.fondo}>
                <SideBar/>
            <div className={styleCities.table_title}>
            <h1 className={styleCities.table_title_style}>Lista de Ciudades</h1>
            </div>
        <table className={styleCities.table_categories}>
            <thead>
                <tr>
                <th style={{ textAlign: "center" }}>ID</th>
                <th style={{ textAlign: "center" }}>Name</th>
                </tr>
            </thead>

            <tbody>
                { 
                        cities?.rows?.map((city: any, index: any) => {
                            return (
                            <tr>
                                <th scope="row" style={{ textAlign: "center", backgroundColor: '#000450'}}>{city.id}</th>
                                <td className={styleCities.th_categories}>{city.name}</td>
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

export default CitiesList
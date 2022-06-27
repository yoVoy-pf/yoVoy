import { useSelector } from 'react-redux';
import usePagination from '../../../hooks/usePagination/usePagination';
import { selectAllProvinces } from '../../../slices/adminPanelSlice';
import SideBar from '../SideBar/SideBar';
import styleCities from './cities-list.module.css'
import PageButtons from '../../PageButtons/PageButtons';

const CitiesList = () => {
  const provinces = useSelector(selectAllProvinces)
  const pagination = usePagination(10, 'provinces');
	const	content = (
			<div className={styleCities.fondo}>
                <SideBar/>
            <div className={styleCities.table_title}>
            <h1 className={styleCities.table_title_style}>Lista de Provincias</h1>
            </div>
        <PageButtons page={pagination.page} limit={pagination.limit} pageButtonHandler={pagination.pageButtonHandler} />
        <table className={styleCities.table_categories}>
            <thead>
                <tr>
                <th style={{ textAlign: "center" }}>ID</th>
                <th style={{ textAlign: "center" }}>Name</th>
                </tr>
            </thead>

            <tbody>
                { 
                        provinces?.rows?.map((city: any, index: any) => {
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
	return content;
}

export default CitiesList
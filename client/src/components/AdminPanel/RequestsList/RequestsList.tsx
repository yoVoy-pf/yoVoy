import React from 'react'
import { Link } from 'react-router-dom';
import { useGetRequestsQuery } from '../../../slices/app/requestsApiSlices';
import SideBar from '../SideBar/SideBar';
import styleRequest from './requests.module.css'

const RequestsList = () => {
    const {
		data: request,
		isLoading,
		isSuccess,
		isError,
		error,
		refetch,
	} = useGetRequestsQuery({ _: '' }, { refetchOnMountOrArgChange: true });
    let content = <span></span>;
    if(!request){
        return(
            <div className={styleRequest.fondo}>
            <SideBar/>
            <div className={styleRequest.text}>
              <h1 className={styleRequest.text_style}><i> ¡UPS! No hay Peticiones Realizadas</i></h1>
            </div>
            </div>
          )
    } else {
		content = (
			<div className={styleRequest.fondo}>
                <SideBar/>
            <div className={styleRequest.table_title}>
            <h1 className={styleRequest.table_title_style}>Lista de Peticiones</h1>
            </div>
        <table className={styleRequest.table_categories}>
            <thead>
                <tr>
                <th style={{ textAlign: "center" }}>ID</th>
                <th style={{ textAlign: "center" }}>Estado</th>
                <th style={{ textAlign: "center" }}>Metodo</th>
                <th style={{ textAlign: "center" }}>Tipo</th>
                {/* <th style={{ textAlign: "center" }}>Descripcion</th> */}
                <th style={{ textAlign: "center" }}>Acciones</th>
                </tr>
            </thead>

            <tbody>
                { 
                        request?.rows?.map((request: any, index: any) => {
                            return (
                            <tr>
                                <th scope="row" style={{ textAlign: "center", backgroundColor: '#000450'}}>{request.id}</th>
                                <td className={styleRequest.th_categories}>{request.status}</td>
                                <td className={styleRequest.th_categories}>{request.method}</td>
                                <td className={styleRequest.th_categories}>{request.type}</td>
                                {/* <td className={styleRequest.th_categories}>{request.description}</td> */}
                                <td className={styleRequest.th_categories}>
                                    <Link to={`/update-request/${request.id}`} className={styleRequest.buttom}>
                                    <button className={styleRequest.buttom_style_left}>
                                        Editar
                                    </button>
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
	} 
	return content;
}

export default RequestsList
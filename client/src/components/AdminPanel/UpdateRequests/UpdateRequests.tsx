import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateRequestsMutation, useGetRequestQuery } from '../../../slices/app/requestsApiSlices'
import SideBar from '../SideBar/SideBar';
import styleUpdateRequest from './update-request.module.css'

const UpdateRequests = () => {
    const { id }:any = useParams();
    const navigate = useNavigate();
    const { data: request } = useGetRequestQuery(id);
    const [updateRequest] = useUpdateRequestsMutation();
    const onChange = (e:any) => {
        id && updateRequest({id, status: e.target.value})
        navigate("/list-requests")
    } 
    
    return (
        <div className={styleUpdateRequest.fondo}>
            <div>
                <SideBar/>
            </div>
            <div className={styleUpdateRequest.component}>
                <div className={styleUpdateRequest.envolment}>
                    <p>ID: {request?.id}</p>
                    <p>Descripcion: {request?.description}</p>
                    <p>Metedo: {request?.method}</p>
                    <span style={{textDecoration: 'solid'}}>Estado: {request?.status}</span>
                    
                    <p>Estado: {request?.status}</p>
                    <p>Tipo: {request?.type}</p>
                    <p>Informacion de Usuario</p>
                    <p>Id de usuario: {request?.user.id}</p>
                    <p>Nombre de usuario: {request?.user.name}</p>
                    <p>Email de usuario: {request?.user.email}</p>
                    <div>
                    <select onChange={(e)=> onChange(e)}>
                    <option value="pending">Pendiente</option>
                    <option value="accepted">Aceptar</option>
                    <option value="rejected">Rechazar</option>
                    </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateRequests
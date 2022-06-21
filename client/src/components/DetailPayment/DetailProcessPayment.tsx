import React from "react";
import { useParams } from "react-router-dom";
import { useGetTicketDetailQuery } from "../../slices/app/ticketsApiSlice";
import SideBar from "../SideBar/SideBar";
import styleProcess from './detail-process-payment.module.css'

const DetailProessPayment = () => {
    const {id} = useParams();
    const{
        data: datos
      } = useGetTicketDetailQuery({id: id})
      console.log("dswafsfasfa",id)
    return (
        <div>
            <div>
                <SideBar/>
            </div>
            {/* {
                datos?.map((e:any)=> {
                    return(
                        <div className={styleProcess.component}>
                            <div className={styleProcess.envolment}>
                            <p >ID de compra: {e.id}</p>
                            <p >ID de usuario: {e.user.id}</p>
                            <p >Nombre de usuario: {e.user.name}</p>
                            <span style={{textDecoration: 'solid'}}>Estado de compra: {e.status}</span> <button>Cambiar estado</button>
                            <p >Detalle de estado de compra: {e.status_detail}</p>
                            <p >Monto de compra: {e.transaction_amount}</p>
                            <p >Cantiidad de tickets: {e.quantity}</p>
                            <p >Nombre de evento: {e.event.name}</p>
                            <p >ID de evento: {e.event.id}</p>
                            <p >Tipo de pago: {e.paymentType}</p>
                            </div>
                        </div>
                    )
                })
            } */}
        </div>
    )
}

export default DetailProessPayment
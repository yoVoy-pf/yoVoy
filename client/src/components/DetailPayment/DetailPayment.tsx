import React from "react";
import { useGetTicketsDetailQuery } from "../../slices/app/ticketsApiSlice";
import SideBar from "../SideBar/SideBar";
import styleDetailPayment from './detail-paiment.module.css'

const DetailPayment = () => {
    const{
        data: datos,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
      } = useGetTicketsDetailQuery({_:''}, {refetchOnMountOrArgChange: true,})
      console.log(datos)
    return(
        <div>
        <SideBar/>
        <div>
          <h1>Detalles de compra</h1>
        </div>
      <table className={styleDetailPayment.table_payment}>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>ID</th>
              <th style={{ textAlign: "center" }}>UserID</th>
              <th style={{ textAlign: "center" }}>EventID</th>
              <th style={{ textAlign: "center" }}>Monto</th>
              <th style={{ textAlign: "center" }}>Estado</th>
              <th style={{ textAlign: "center" }}>Cantidad</th>
            </tr>
          </thead>

          <tbody>
          {datos?.map((ticket: any, index: any) => {
            return (
              <tr key={index}>
                <th scope="row" style={{ textAlign: "center" }}>{ticket.id}</th>
                <td className={styleDetailPayment.th_payment}>{ticket.userId}</td>
                <td className={styleDetailPayment.th_payment}>{ticket.eventId}</td>
                <td className={styleDetailPayment.th_payment}>{ticket.transaction_amount}</td>
                <td className={styleDetailPayment.th_payment}>{ticket.status}</td>
                <td className={styleDetailPayment.th_payment}>{ticket.quantity}</td>
              </tr>
              );
            })}
            </tbody>
        </table>
        </div>
    )
}

export default DetailPayment
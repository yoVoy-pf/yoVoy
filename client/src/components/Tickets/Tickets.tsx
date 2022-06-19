import React from 'react';
import { Ticket } from '../../types';
import style_ticket from "./Tickets.module.css"

interface Props {
	ticket: Ticket;
}

const Tickets = ({ ticket }: Props) => {
	return (
		<React.Fragment>
			<div className={style_ticket.container}>
				<div className={style_ticket.bg}>

					<h2>{ticket.event.name}</h2>
					<h4>Cantidad de Tickets: {ticket.quantity}</h4>
					<h4>Precio: {"$" + ticket.transaction_amount}</h4>
					<h4>Estado de la Compra: {ticket.status}</h4>
					<h4>Tipo de Pago: {ticket.paymentType}</h4>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Tickets;

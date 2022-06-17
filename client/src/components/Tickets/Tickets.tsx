import React from 'react';
import { Ticket } from '../../types';

interface Props {
	ticket: Ticket;
}

const Tickets = ({ ticket }: Props) => {
	return (
		<React.Fragment>
			<div>
				<h1>{ticket.event.name}</h1>
				<h4>Cantidad de Tickets: {ticket.quantity}</h4>
				<h4>Precio: {ticket.transaction_amount}</h4>
				<h4>Estado de la Compra: {ticket.status}</h4>
				<h4>Tipo de Pago: {ticket.paymentType}</h4>
			</div>
		</React.Fragment>
	);
};

export default Tickets;

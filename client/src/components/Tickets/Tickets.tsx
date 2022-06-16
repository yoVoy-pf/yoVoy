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
				<h3>{ticket.quantity}</h3>
				<h3>{ticket.paymentType}</h3>
				<h3>{ticket.transaction_amount}</h3>
			</div>
		</React.Fragment>
	);
};

export default Tickets;

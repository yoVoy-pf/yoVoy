import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../EventCart/EventCart.module.css';
import { selectCartTickets } from '../../slices/cartSlice';
import { TicketCart } from '../EventCart/TicketCart';
import { useCreateCheckoutPaymentMutation } from '../../slices/app/usersApiSlice';

const Checkout = () => {
	const [ticketsLength, setTicketsLength] = useState(0);

	const [createCheckoutPayment] = useCreateCheckoutPaymentMutation();

	const cartItems = useSelector(selectCartTickets);

	useEffect(() => {
		setTicketsLength(
			cartItems?.reduce(
				(previous: number, current: any) => previous + current?.quantity,
				0,
			),
		);
	}, [cartItems]);
	console.log(cartItems);

	const total = cartItems?.reduce(
		(previous: number, current: any) =>
			previous + current.quantity * current.price,
		0,
	);

	return (
		<div>
			{cartItems.length === 0 ? (
				<p className={styles.cartVacio}>Tu carrito esta vacio</p>
			) : (
				<div className={styles.productsContainer}>
					{cartItems?.map((item: any) => (
						<TicketCart key={item.dateId} item={item} />
					))}
				</div>
			)}
			<h2 className={styles.total}>Total: ${total}</h2>

			<div>
				<button
					onClick={() =>
						createCheckoutPayment({ newPayment: cartItems }).then(
							(result: any) => console.log(result),
						)
					}
				>
					Pagar
				</button>
			</div>
		</div>
	);
};

export default Checkout;

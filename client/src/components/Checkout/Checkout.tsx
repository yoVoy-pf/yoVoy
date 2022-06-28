import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../EventCart/EventCart.module.css';

import { TicketCart } from '../EventCart/TicketCart';
import { useCreateCheckoutPaymentMutation } from '../../slices/app/usersApiSlice';

import { selectCartTickets } from '../../slices/cartSlice';


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
	}, [cartItems ]);


	const total = cartItems?.reduce(
		(previous: number, current: any) =>
			previous + current.quantity * current.price,
		0,
	);

	const handleClick = async () => {
		const payment = {
			list: cartItems,
		};
		try {
			await createCheckoutPayment({ newPayment: payment }).then((result: any) =>
				window.location.replace(result.data),
			);
		} catch (error) {
			console.log(error);
		}
	};

	console.log('cartItems', cartItems)

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
			<hr />
			<h3 className={styles.total}> Tickets: ${total}</h3>
			<h3 className={styles.total}> Cargo de servicio: ${(total * 0.05).toFixed(2)}</h3>
			
			<h2 className={styles.total}>Total: ${(total * 1.05).toFixed(2)}</h2>

			<div>
				<button onClick={handleClick}>Pagar</button>
			</div>
		</div>
	);
};

export default Checkout;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Checkout.module.css';
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

	return (
		<div>
			{cartItems.length === 0 ? (
				<p className={styles.cartVacio}>Tu carrito esta vacio</p>
			) : (
				<div className={styles.productsContainer}>
					<form className={styles.ticketcontainer} id="form1">
						{cartItems?.map((item: any) => (
							<TicketCart className={styles.ticket} key={item.dateId} item={item} />
						))}
					</form>
				</div>
			)}
			<h2 className={styles.total}>Total: ${total}</h2>

			<div className={styles.container_button}>
				<p>Estas a un paso de finalizar tu compra, haz click abajo para ir al pago.</p>
				<button onClick={handleClick}>Pagar</button>
			</div>
		</div>
	);
};

export default Checkout;

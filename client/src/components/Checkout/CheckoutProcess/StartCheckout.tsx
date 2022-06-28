import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../EventCart/EventCart.module.css';
import { TicketCart } from '../../EventCart/TicketCart';
import CheckoutNavbar from '../CheckoutNavbar/CheckoutNavbar';
import { Link } from 'react-router-dom';
import { selectCartTickets } from '../../../slices/cartSlice';

const Checkout = () => {
	const [ticketsLength, setTicketsLength] = useState(0);

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

	return (
		<div>
			<CheckoutNavbar />
			<nav>
				<ul>
					<li className="nav startPayment">INICIO PROCESO DE PAGO</li>
					<li className="nav controlPayment">ENTREGA Y CONTROL</li>
					<li className="nav finishPayment">MEDIO DE PAGO</li>
				</ul>
			</nav>
			<hr />
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
				<h3 className={styles.total}>
					{' '}
					TICKETS + CARGO DE SERVICIO = Total ${' '}
					<b>{(total * 1.05).toFixed(2)}</b>
				</h3>

				<div>
					<Link to="/">
						<button>VOLVER AL SITIO</button>
					</Link>
					<Link to="/checkout/delivery">
						<button>PASO SIGUIENTE</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Checkout;

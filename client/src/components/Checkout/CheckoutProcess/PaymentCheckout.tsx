import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartTickets } from '../../../slices/cartSlice';
import CheckoutNavbar from '../CheckoutNavbar/CheckoutNavbar';
import styles from './DeliveryCheckout.module.css';
import image from '../../../img/mercado-pago.png';
import { FcCheckmark } from 'react-icons/fc';
import { useCreateCheckoutPaymentMutation } from '../../../slices/app/usersApiSlice';
import Swal from 'sweetalert2';

const PaymentCheckout = () => {
	const [createCheckoutPayment] = useCreateCheckoutPaymentMutation();
	const cartItems = useSelector(selectCartTickets);

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
			window.localStorage.removeItem('cartTickets');
			console.log('asdasd');
		} catch (error) {
			console.log(error);
		}
	};

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
						<h4>DETALLES</h4>
						{cartItems?.map((item: any) => {
							return (
								<div key={item.id}>
									<p>
										<b>{item.eventName}</b>
										{` | ${item.locationName} | ${item.date}`}
									</p>
									<div>
										<div>
											<ul>
												<li>
													{`${item.quantity} x GENERAL        `}
													<b>{item.price * item.quantity}</b>
												</li>
												<li>
													COSTO POR SERVICIO <b>{(total * 0.05).toFixed(2)}</b>{' '}
												</li>
											</ul>
										</div>
									</div>
								</div>
							);
						})}
						<div>
							<h4>ENTREGA</h4>
							<p>
								Recibira un e-mail con su E-Ticket <FcCheckmark />
							</p>
						</div>
						<div className={styles.mercadoPago}>
							<h4>PAGO</h4>
							<img src={image} alt="mercado-pago" />
						</div>
					</div>
				)}
				<hr />
				<h3 className={styles.total}>
					{' '}
					TICKETS + CARGO DE SERVICIO = Total ${' '}
					<b>{(total * 1.05).toFixed(2)}</b>
				</h3>

				<div>
					<Link to="/checkout">
						<button>VOLVER</button>
					</Link>

					<button onClick={handleClick}>PAGAR</button>
				</div>
			</div>
		</div>
	);
};

export default PaymentCheckout;

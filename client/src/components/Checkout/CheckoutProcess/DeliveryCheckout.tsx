import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartTickets } from '../../../slices/cartSlice';
import CheckoutNavbar from '../CheckoutNavbar/CheckoutNavbar';
import styles from './DeliveryCheckout.module.css';
import style from "./DeliveryCheckout.module.css"

const DeliveryCheckout = () => {
	const cartItems = useSelector(selectCartTickets);

	const total = cartItems?.reduce(
		(previous: number, current: any) =>
			previous + current.quantity * current.price,
		0,
	);

	return (
		<div className={style.container}>
			<CheckoutNavbar />
			<nav>
				<ul className={style.ul}>
					<li className="nav startPayment">INICIO PROCESO DE PAGO</li>
					<li className={style.nav_startPayment}>ENTREGA Y CONTROL</li>
					<li className="nav finishPayment">MEDIO DE PAGO</li>
				</ul>
			</nav>
			{/* <hr /> */}
			<div className={style.line}></div>
			<div >
				{cartItems.length === 0 ? (
					<p className={styles.cartVacio}>Tu carrito esta vacio</p>
				) : (
					<div className={style.containerBg}>
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

													VALOR TICKET <b>{item.price}</b>

												</li>
												<li>
													{`${item.quantity} x GENERAL        `}
													<b>{item.price * item.quantity}</b>
												</li>
												<li>
													COSTO POR SERVICIO{' '}
													<b>
														{(item.price * item.quantity * 0.05).toFixed(2)}
													</b>{' '}
												</li>
											</ul>
										</div>
									</div>
								</div>
							);
						})}
						<div className={style.sendbg}>
							<h4>ENTREGA</h4>
							<p>Recibira un e-mail con su E-Ticket</p>
							<input type="checkbox" />
							<span>Acepto recibir un e-mail.</span>
						</div>
						<div className={styles.mercadoPago}>
							<h4>PAGO</h4>
						</div>
					</div>
				)}
				{/* <hr /> */}
				<h3 className={style.total}>
					{' '}
					TICKETS + CARGO DE SERVICIO = Total ${' '}
					<b>{(total * 1.05).toFixed(2)}</b>
				</h3>

				<div  className={style.buttonPassBg}>
					{/* <Link to>
      <button onClick={handleClick}></button>
      </Link> */}

					<Link to="/checkout">
						<button className={style.buttonPass}>VOLVER</button>
					</Link>
					<Link to="/checkout/payment">
						<button className={style.buttonPass}>PASO SIGUIENTE</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default DeliveryCheckout;

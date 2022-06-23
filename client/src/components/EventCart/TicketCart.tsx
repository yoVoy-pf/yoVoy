import React, { useContext } from 'react';

import { EventCartContext } from './EventCartContext';
import styles from './TicketCart.module.css';

export const TicketCart = ({ item }: any) => {
	/* Traemos del context las funciones para agregar y sacar productos del carrito */
	const { addTicketToCart, deleteItemToCar } = useContext(EventCartContext);

	/* Desestructuramos el item para sacar solo la id */

	return (
		<div className={styles.cartItem}>
			<img src={item.img} alt={item.name} />
			<div className={styles.dataContainer}>
				<div className={styles.left}>
					<p>{item.name}</p>
					<div className={styles.buttons}>
						<button onClick={() => addTicketToCart(item)}>AGREGAR</button>
						<button onClick={() => deleteItemToCar(item)}>SACAR</button>
					</div>
				</div>
				<div className={styles.right}>
					<div>{item.amount}</div>
					<p>Total: ${item.amount * item.price}</p>
				</div>
			</div>
		</div>
	);
};

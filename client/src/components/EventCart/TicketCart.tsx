import React, { useContext } from 'react';
import { Item } from '../../types';

import { EventCartContext } from './EventCartContext';
import styles from './TicketCart.module.css';

interface props {
	item: Item;
}

export const TicketCart = ({ item }: props) => {
	const { addTicketToCart, deleteItemToCar } = useContext(EventCartContext);

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
					<div>{item.quantity}</div>
					<p>Total: ${item.quantity * item.price}</p>
				</div>
			</div>
		</div>
	);
};

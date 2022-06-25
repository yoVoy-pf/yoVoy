import React from 'react';
import { Item } from '../../types';
import { useDispatch } from 'react-redux';
import { deleteFromCart } from '../../redux/actions/actions-Create';
import styles from './TicketCart.module.css';

interface props {
	item: Item;
}

export const TicketCart = ({ item }: props) => {

  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(deleteFromCart(item) as any);
  }

	return (
		<div className={styles.cartItem}>
			<img src={item.img} alt={item.name} />
			<div className={styles.dataContainer}>
				<div className={styles.left}>
					<p>{item.name}</p>
					<div className={styles.buttons}>
						<button onClick={handleRemove}>SACAR</button>
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

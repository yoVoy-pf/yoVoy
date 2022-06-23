import { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const EventCartContext = createContext({} as any);

export const EventCartProvider = ({ children }: any) => {
	const [cartItems, setCartItems] = useState(() => {
		try {
			const ticketsLocalStorage = window.localStorage.getItem('cartItems');
			return ticketsLocalStorage ? JSON.parse(ticketsLocalStorage) : [];
		} catch (error) {
			return [];
		}
	});

	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 1300,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer);
			toast.addEventListener('mouseleave', Swal.resumeTimer);
		},
	});

	const handleAddShow = () => {
		Toast.fire({
			icon: 'success',
			title: 'Agregado al carrito con exito',
		});
	};

	useEffect(() => {
		localStorage.setItem('cartTickets', JSON.stringify(cartItems));
		console.log('cartItems', cartItems);
	}, [cartItems]);

	const addTicketToCart = (ticket: any) => {
		handleAddShow();
		const inCart = cartItems?.find(
			(ticketInCart: any) => ticketInCart.id === ticket.id,
		);
		if (inCart) {
			setCartItems(
				cartItems?.map((ticketInCart: any) => {
					if (ticketInCart.id === ticket.id) {
						return { ...inCart, amount: inCart.amount + 1 };
					} else return ticketInCart;
				}),
			);
		} else {
			setCartItems([...cartItems, { ...ticket, amount: 1 }]);
		}
	};

	const deleteItemToCar = (ticket: any) => {
		const inCart = cartItems?.find(
			(ticketInCart: any) => ticketInCart.id === ticket.id,
		);

		if (inCart?.amount === 1) {
			setCartItems(
				cartItems?.filter((ticketInCart: any) => ticketInCart.id !== ticket.id),
			);
		} else {
			setCartItems(
				cartItems?.map((ticketInCart: any) => {
					if (ticketInCart.id === ticket.id) {
						return { ...inCart, amount: inCart.amount - 1 };
					} else return ticketInCart;
				}),
			);
		}
	};
	return (
		<EventCartContext.Provider
			value={{ cartItems, addTicketToCart, deleteItemToCar }}
		>
			{children}
		</EventCartContext.Provider>
	);
};

import { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const EventCartContext = createContext({} as any);

export const EventCartProvider = ({ children }: any) => {
	const [cartItems, setCartItems] = useState(() => {
		try {
			const ticketsLocalStorage = localStorage.getItem('cartTickets');
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

	const handleDelhow = () => {
		Toast.fire({
			icon: 'warning',
			title: 'Ticket eliminado con exito',
		});
	};

	useEffect(() => {
		localStorage.setItem('cartTickets', JSON.stringify(cartItems));
		console.log('cartItems', cartItems);
	}, [cartItems]);

	const addTicketToCart = (ticket: any) => {
		const inCart = cartItems.find(
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
		handleAddShow();
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
		handleDelhow();
	};

	const editItemToCart = ({ id, amount }: any) => {};
	return (
		<EventCartContext.Provider
			value={{ cartItems, addTicketToCart, deleteItemToCar }}
		>
			{children}
		</EventCartContext.Provider>
	);
};
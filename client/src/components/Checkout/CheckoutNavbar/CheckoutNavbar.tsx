import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../slices/authentication/authSlice';
import image from '../../../img/oie_transparent.png';
import Logout from '../../Logout/Logout';
import './CheckoutNavbar.css';

const CheckoutNavbar = () => {
	const currentUser = useSelector(selectCurrentUser);
	return (
		<div>
			{' '}
			<nav className='Checkout_Navbar_Container'>
				<div className="navbar-log">
					<img src={image} alt="img" />
				</div>
				<div className='container_ul_nav'>
				<ul className='Navbar_Bg_li'>
					<li className='NavBar_lis'>Usuario: {currentUser && currentUser?.['name']}</li>
					<li className='NavBar_li'>Email: {currentUser && currentUser?.['email']}</li>
				</ul>
				</div>
				{currentUser && (
					<div>
						<Logout />
					</div>
				)}
			</nav>
		</div>
	);
};

export default CheckoutNavbar;

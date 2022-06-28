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
			<nav>
				<ul>
					<li>{currentUser && currentUser?.['email']}</li>
					<li>{currentUser && currentUser?.['name']}</li>
				</ul>
				{currentUser && (
					<div>
						<Logout />
					</div>
				)}
				<div className="navbar-log">
					<img src={image} alt="img" />
				</div>
			</nav>
		</div>
	);
};

export default CheckoutNavbar;

import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import home from '../Home/home.module.css';
import { EventCartProvider } from '../EventCart/EventCartContext';
import EventCart from '../EventCart/EventCart';

const Layout = () => {
	return (
		<div className={home.container}>
			<div className={home.container}>
				<NavBar />
				<EventCartProvider>
					<EventCart />
				</EventCartProvider>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;

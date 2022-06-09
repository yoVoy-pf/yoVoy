import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvent } from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';
import Card from '../Card/Card';
import Events from '../Events/Events';
import FilterEvent from '../FilterEvents/FilterEvents';
import NavBar from '../NavBar/NavBar';



import s from './home.module.css';

const Home = () => {
	const dispatch: AppDispatch = useDispatch();
	const allEvents = useSelector((state: State) => state.allEvents);

	useEffect(() => {
		dispatch(getAllEvent());
	}, [dispatch]);

	return (
		<div className={s.container}>
			<NavBar/>
			<FilterEvent />
			<div className={s.home}>
				{allEvents.length > 0 ? (
					<Events allEvents={allEvents} />
				) : (
					<h1>Cargando</h1>
				)}
			</div>
		</div>
	);
};

export default Home;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvent } from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';
import Card from '../Card/Card';
import Events from '../Events/Events';
import FilterEvent from '../FilterEvents/FilterEvents';
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';



import home from './home.module.css';

const Home = () => {
	const dispatch: AppDispatch = useDispatch();
	const allEvents = useSelector((state: State) => state.global.allEvents);

	useEffect(() => {
		dispatch(getAllEvent());
	}, [dispatch]);

	return (
		<div >
			
			<div className={home.searchbar}>
				<SearchBar/>
			</div>
			<div>
				<FilterEvent />
			</div>
			<div className={home.home}>
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

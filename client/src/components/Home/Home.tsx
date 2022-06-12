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
				{allEvents.length > 0 ? allEvents[0] !== "no hay eventos"? (
					<Events allEvents={allEvents} />
				) : (allEvents[1]==="byFilter"? <h1>No hay eventoscon estas caracteristicas</h1>: 
			    <h1>0 resultados de busqueda</h1>) : (
					<h1>Cargando</h1>
				)}
			</div>
		</div>
	);
};

export default Home;

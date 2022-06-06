import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvent } from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';
import Card from '../Card/Card';
import Events from '../Events/Events';
import SearchBar from '../SearchBar/SearchBar';

import s from './home.module.css';

const Home = () => {
	const dispatch: AppDispatch = useDispatch();
	const allEvents = useSelector((state: State) => state.allEvents);

	useEffect(() => {
		dispatch(getAllEvent());
	}, [dispatch]);

	return (
		<div>
			<SearchBar />
			<div className={s.home}>
				<Events allEvents={allEvents} />
			</div>
		</div>
	);
};

export default Home;

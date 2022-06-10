import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
	getCategories,
	getEventByCategory,
	getCities,
	getLocations,
} from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';
import { Category, City, Location } from '../../types';

const FilterEvent = () => {
	const dispatch: AppDispatch = useDispatch();
	const categories: Array<Category> = useSelector(
		(state: State) => state.global.categories,
	);
	const cities: Array<City> = useSelector(
		(state: State) => state.global.cities,
	);
	const locations: Array<Location> = useSelector(
		(state: State) => state.global.locations,
	);

	useEffect(() => {
		dispatch(getCategories());
		dispatch(getCities());		
	}, [dispatch]);

     useEffect(() => {
        const firstCity = document.getElementById("city1")
		const idfirstCity = firstCity?.getAttribute("value")
		if(idfirstCity) dispatch(getLocations(idfirstCity));
	 }, [cities])

	const handleCategoryFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(getEventByCategory(e.target.value, "category"));
	};

	const handleCitiesFilter = (e: React.ChangeEvent<HTMLSelectElement>)=> {
		dispatch(getLocations(e.target.value));
		dispatch(getEventByCategory(e.target.value, "city"));
	}

	const handleLocationFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(getEventByCategory(e.target.value, "location"));
	};

	return (
		<div>
			<select onChange={handleCategoryFilter}>
				{categories.map((c) => (
					<option key={c.name} value={c.id}>
						{c.name}
					</option>
				))}
			</select>

			<select onChange={handleCitiesFilter}>
				{cities.map((city) => (
					<option id={`city${city.id}`}key={city.name} value={city.id}>
						{city.name}
					</option>
				))}
			</select>

			<select onChange={handleLocationFilter}>
				{locations.map((l) => (
					<option key={l.name} value={l.id}>
						{l.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default FilterEvent;
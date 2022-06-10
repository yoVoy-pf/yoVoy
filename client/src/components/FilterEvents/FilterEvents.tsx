import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
	getCategories,
	getEventByCategory,
	getCities,
} from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';
import { Category, City } from '../../types';

const FilterEvent = () => {
	const dispatch: AppDispatch = useDispatch();
	const categories: Array<Category> = useSelector(
		(state: State) => state.global.categories,
	);
	const cities: Array<City> = useSelector(
		(state: State) => state.global.cities,
	);

	useEffect(() => {
		dispatch(getCategories());
		dispatch(getCities());
	}, [dispatch]);
	const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(getEventByCategory(e.target.value));
	};

	return (
		<div>
			<select onChange={handleFilter}>
				{categories.map((c) => (
					<option key={c.name} value={c.id}>
						{c.name}
					</option>
				))}
			</select>

			<select >
				{cities.map((city) => (
					<option key={city.name} value={city.id}>
						{city.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default FilterEvent;
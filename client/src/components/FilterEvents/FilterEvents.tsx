import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
	getCategories,
	getEventByCategory,
} from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';
import { Category } from '../../types';

const FilterEvent = () => {
	const dispatch: AppDispatch = useDispatch();
	const categories: Array<Category> = useSelector(
		(state: State) => state.global.categories,
	);

	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);
	const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(getEventByCategory(e.target.value));
	};

	return (
		<div>
			<select onChange={handleFilter}>
				{categories.map((c) => (
					<option key={c.name} value={c.name}>
						{c.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default FilterEvent;

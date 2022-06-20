import React, { AriaAttributes, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
	getCategories,
	getEventByCategory,
	getCities,
	getLocations,
} from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';
import { Category, City, Location, Filter } from '../../types';

import filterStyle from "./FilterEvents.module.css"

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

	const [filters, setFilters] = useState<Array<Filter>>([])
	const [citySelected, setCitySelected] = useState<string>("")

	useEffect(() => {
		dispatch(getCategories());
		dispatch(getCities());
	}, [dispatch]);

	useEffect(() => {
		// const firstCity = document.getElementById("city1")
		// const idfirstCity = firstCity?.getAttribute("value")
		// if (idfirstCity) dispatch(getLocations(idfirstCity));
		dispatch(getLocations())
	}, [cities])

	useEffect(() => {
		dispatch(getEventByCategory(filters));
	}, [filters])

	const handleCategoryFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const categoryFilt: Filter = {
			filter: "category",
			id: e.target.value
		}
		setFilters([categoryFilt, filters[1]])
	};

	const handleCitiesFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(getLocations(e.target.value));
		const CityFilt: Filter = {
			filter: "city",
			id: e.target.value
		}
		setCitySelected(e.target.value)
		setFilters([filters[0], CityFilt])
		// dispatch(getEventByCategory(e.target.value, "city"));
	}

	const handleLocationFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const LocationFilt: Filter = {
			filter: "location",
			id: e.target.value
		}
		if (e.target.value !== "") {
			setFilters([filters[0], LocationFilt])
		} else {
			const CityFilt: Filter = {
				filter: "city",
				id: citySelected
			}
			setFilters([filters[0], CityFilt])
		}

		// dispatch(getEventByCategory(e.target.value, "location"));
	};
 
	const handleDateChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
		let dateArr = (e.target.value).split("-").reverse()
		let date = dateArr.map((d:any)=>{
			if(d[0]==="0"){
				return d.substring(1)
			} else {
				return d
			}
		})
		const DateFilt: Filter = {
			filter: "date",
			id: date.join("/")
		}
		setFilters([DateFilt])
	}

	return (
		<div className={filterStyle.bg_div}>
			<div className={filterStyle.bg_div1}>

			<select onChange={handleCategoryFilter}>
				<option className={filterStyle.option} key={"allCategories"} value="">todas las categorias</option>
				{categories.map((c) => (
					<option className={filterStyle.option} key={c.name} value={c.id}>
						{c.name}
					</option>
				))}
			</select>

			<select id='cityFilter' onChange={handleCitiesFilter}>
				<option className="optionCity" key={"allCities"} value="">todas las ciudades</option>
				{cities.map((city) => (
					<option  id={`city${city.id}`} key={city.name} value={city.id}>
						{city.name}
					</option>
				))}
			</select>

			<select onChange={handleLocationFilter}>
				<option key={"allLocations"} value="">todas las locaciones</option>
				{locations.map((l) => (
					<option key={l.name} value={l.id}>
						{l.name}
					</option>
				))}
			</select>

			<input 
			type={"date"} 
			onChange={(e)=>{handleDateChange(e)}}
			className={filterStyle.input_filter}
			/>
			</div>
			<div className={filterStyle.line}></div>
		</div>
	);
};

export default FilterEvent;

import React, { useState } from 'react';
import { AppDispatch } from '../../redux/store/store';
import { useDispatch } from 'react-redux';
import { getSearchEvent } from '../../redux/actions/actions-Create';
import './SearchBar.css';
import {Toast} from '../../utils/alerts'

type FormElement = React.FormEvent<HTMLFormElement>;
type Input = React.ChangeEvent<HTMLInputElement>;

const SearchBar = ({searchEventQuery}: any) => {
	const dispatch: AppDispatch = useDispatch();
	const [input, setInput] = useState('');

	function onSubmit(e: FormElement) {
		e.preventDefault();
		input
			? searchEventQuery(e, input)
			: Toast.fire({
					title: 'Ingrese el nombre de un Evento',
					icon: 'warning',
			  });
		setInput('');
	}

	function onInputChange(e: Input) {
		setInput(e.target.value);
	}

	return (
		<React.Fragment>
			<form onSubmit={onSubmit}>
				<input
					className="searchBar-bg-input1"
					type="text"
					onChange={onInputChange}
					value={input}
					placeholder="Buscar..."
				/>
				<input className="searchBar-bg-input2" type="submit" value="🔍" />
			</form>
		</React.Fragment>
	);
};

export default SearchBar;

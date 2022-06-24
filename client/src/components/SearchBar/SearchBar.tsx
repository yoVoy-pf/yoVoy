import React, { useState } from 'react';
import { AppDispatch } from '../../redux/store/store';
import { useDispatch } from 'react-redux';
import { getSearchEvent } from '../../redux/actions/actions-Create';
import './SearchBar.css';
import Swal from 'sweetalert2';

type FormElement = React.FormEvent<HTMLFormElement>;
type Input = React.ChangeEvent<HTMLInputElement>;

const SearchBar = () => {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 1500,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer);
			toast.addEventListener('mouseleave', Swal.resumeTimer);
		},
	});
	const dispatch: AppDispatch = useDispatch();
	const [input, setInput] = useState('');

	function onSubmit(e: FormElement) {
		e.preventDefault();
		input
			? dispatch(getSearchEvent(input))
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

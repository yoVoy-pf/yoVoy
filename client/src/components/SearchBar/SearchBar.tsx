import React, { useState } from 'react';
import { AppDispatch } from '../../redux/store/store';
import { useDispatch } from 'react-redux';
import { getSearchEvent } from '../../redux/actions/actions-Create';
import './SearchBar.css';
import Swal from 'sweetalert2';
import { useGetEventsQuery } from '../../slices/app/eventsApiSlice';

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
	const {
		data: events,
		refetch,
		isFetching,
	} = useGetEventsQuery({ _: '' }, { refetchOnMountOrArgChange: true });
	const eventos = events?.rows?.map((e: any) => e);
	const dispatch: AppDispatch = useDispatch();
	const [input, setInput] = useState('');

	function onSubmit(searchTerm: any) {
		setInput(searchTerm);
		input
			? dispatch(getSearchEvent(searchTerm))
			: Toast.fire({
					title: 'Ingrese el nombre de un Evento',
					icon: 'warning',
			  });
	}

	function onInputChange(e: Input) {
		setInput(e.target.value);
	}

	return (
		<React.Fragment>
			<div>
				<input
					className="searchBar-bg-input1"
					type="text"
					onChange={onInputChange}
					value={input}
					placeholder="Buscar..."
				/>
				<button
					className="searchBar-bg-input2"
					type="submit"
					onClick={() => onSubmit(input)}
				>
					🔍
				</button>
				<div className="searchBar-autoSuggest">
					{eventos
						?.filter((item: any) => {
							const searchTerm = input.toLowerCase();
							const name = item.name.toLowerCase();

							return (
								searchTerm && name.startsWith(searchTerm) && name !== searchTerm
							);
						})
						.slice(0, 10)
						.map((e: any) => (
							<div
								className="searchBar-autoSuggest-row"
								onClick={() => onSubmit(e.name)}
								key={e.name}
							>
								{e.name}
							</div>
						))}
				</div>
			</div>
		</React.Fragment>
	);
};

export default SearchBar;

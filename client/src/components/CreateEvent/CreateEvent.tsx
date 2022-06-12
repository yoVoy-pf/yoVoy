import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
	getCategories,
	getLocations,
	postCreateEvent,
} from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';
import { Category, Location } from '../../types';
import DatesModal from './CreateEventModal/DatesModal';
import { useCreateEvent } from './useCreateEvent';
import { useDatesModal } from './CreateEventModal/useDatesModal';
import {useCreateEventMutation} from '../../slices/app/eventsApiSlice'

interface CreateEventState {
	event: Array<{}>;
}

const CreateEvent = () => {
	const [isOpenModal, openModal, closeModal] = useDatesModal(false);
  const [createEvent] = useCreateEventMutation();
	const dispatch: AppDispatch = useDispatch();

	const locations: Array<Location> = useSelector(
		(state: State) => state.global.locations,
	);
	const categories: Array<Category> = useSelector(
		(state: State) => state.global.categories,
	);

	useEffect(() => {
		dispatch(getLocations());
		dispatch(getCategories());
	}, [dispatch]);

	const [event, setEvent] = useState<CreateEventState['event']>([]);

	const [
		input,
		handleInputChange,
		setInput,
		handleCategoryChange,
		handleLocationChange,
		inputDate,
		setInputDate,
		handleInputDateChange,
	] = useCreateEvent({
		name: '',
		description: '',
		background_image: '',
		locations: '',
		categoryIds: [],
		dates: [],
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// dispatch(postCreateEvent(input));
    try{
      await createEvent({newEvent: input})
      setEvent([...event, input]);
      setInput({
        name: '',
        description: '',
        background_image: '',
        locations: '',
        categoryIds: [],
        dates: [],
      });
    }catch(error){console.log(error)}
	};

	const addDate = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setInput({ ...input, dates: [...input.dates, inputDate] });
		setInputDate({ price: 0, date: '' });
		closeModal();
	};

	return (
		<React.Fragment>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<label htmlFor="name">Nombre del evento:</label>
					<input
						name="name"
						type="text"
						id="name"
						placeholder="Nombre del evento"
						onChange={handleInputChange}
						value={input.name}
					/>
				</fieldset>
				<fieldset>
					<label htmlFor="description">Descripcion:</label>
					<input
						name="description"
						type="text"
						id="description"
						placeholder="Descripcion..."
						onChange={handleInputChange}
						value={input.description}
					/>
				</fieldset>
				<fieldset>
					<label htmlFor="background_image">Imagen:</label>
					<input
						name="background_image"
						type="text"
						id="background_image"
						placeholder="Imagen..."
						onChange={handleInputChange}
						value={input.background_image}
					/>
				</fieldset>
				<fieldset>
					<select
						name="locations"
						id="locations"
						onChange={handleLocationChange}
					>
						<option value="default">Seleccione la ciudad...</option>
						{locations?.map((location: Location) => {
							return (
								<option key={location.id} value={location.id}>
									{`-${location.id}, ${location.address}, ${location.name}, ${location.city['name']}.`}
								</option>
							);
						})}
					</select>
				</fieldset>

				<fieldset>
					<label htmlFor="categories">Seleccione las categorias...</label>
					{categories?.map((category: Category) => {
						return (
							<React.Fragment key={category.id}>
								<input
									value={category.id}
									type="checkbox"
									onChange={handleCategoryChange}
								/>
								<span>{`-${category.id}, ${category.name}`}.</span>
							</React.Fragment>
						);
					})}
				</fieldset>

				<fieldset>
					<button onClick={openModal} type="button">
						Agregar fechas
					</button>
					<DatesModal isOpen={isOpenModal} closeModal={closeModal}>
						<h3>Agregar fechas.</h3>

						<input
							name="price"
							type="number"
							id="price"
							onChange={handleInputDateChange}
							value={inputDate.price}
						/>
						<input
							name="date"
							type="date"
							id="date"
							onChange={handleInputDateChange}
							value={inputDate.date}
						/>

						<button onClick={(e: any) => addDate(e)}>+</button>
					</DatesModal>

					{input.dates?.map((date: any) => {
						return (
							<React.Fragment key={date.date}>
								<h5>$: {date.price}</h5>
								<h5>Fecha: {date.date}</h5>
							</React.Fragment>
						);
					})}
				</fieldset>
				<button type="submit">Create</button>
			</form>
		</React.Fragment>
	);
};

export default CreateEvent;

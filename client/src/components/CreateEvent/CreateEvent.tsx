import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
	getCategories,
	getLocations,
} from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';
import { Category, Location } from '../../types';
import DatesModal from './CreateEventModal/DatesModal';
import { useCreateEvent } from './useCreateEvent';
import { useDatesModal } from './CreateEventModal/useDatesModal';
import {useCreateEventMutation} from '../../slices/app/eventsApiSlice'
import styleCreateEvent from './create-event.module.css'

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
		categories: [],
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
        categories: [],
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
			<div className={styleCreateEvent.form_order}>
				<fieldset className={styleCreateEvent.fieldset_form}>
					{/* <label htmlFor="name">Nombre del evento:</label> */}
					<legend className={styleCreateEvent.legend_form}>Nombre del evento:</legend>
					<input
						name="name"
						type="text"
						id="name"
						placeholder="Nombre del evento"
						className={styleCreateEvent.input_create}
						onChange={handleInputChange}
						value={input.name}
					/>
				</fieldset> <br />
				<fieldset className={styleCreateEvent.fieldset_form}>
					{/* <label htmlFor="description">Descripcion:</label> */}
					<legend className={styleCreateEvent.legend_form}>Descripcion:</legend>
					<input
						name="description"
						type="text"
						id="description"
						placeholder="Descripcion..."
						className={styleCreateEvent.input_create}
						onChange={handleInputChange}
						value={input.description}
					/>
				</fieldset> <br />
				<fieldset className={styleCreateEvent.fieldset_form}>
					{/* <label htmlFor="background_image">Imagen:</label> */}
					<legend className={styleCreateEvent.legend_form}>Imagen:</legend>
					<input
						name="background_image"
						type="text"
						id="background_image"
						placeholder="Imagen..."
						className={styleCreateEvent.input_create}
						onChange={handleInputChange}
						value={input.background_image}
					/>
				</fieldset> <br />
				<fieldset className={styleCreateEvent.fieldset_form}>
					<legend className={styleCreateEvent.legend_form}>Seleccione la ciudad:</legend>
					<select
						name="locations"
						id="locations"
						className={styleCreateEvent.form_cities}
						onChange={handleLocationChange}
					>
						<option value="default">Seleccione la ciudad...</option>
						{locations?.map((location: Location) => {
							return (
								<option key={location.id} value={location.id} className={styleCreateEvent.form_citie}>
									{`-${location.id}, ${location.address}, ${location.name}, ${location.city['name']}.`}
								</option>
							);
						})}
					</select>
				</fieldset> <br />

				<fieldset className={styleCreateEvent.fieldset_form}>
					{/* <label htmlFor="categories">Seleccione las categorias...</label> <br /> */}
					<legend className={styleCreateEvent.legend_form}>Seleccione las categorias:</legend>
					{categories?.map((category: Category) => {
						return (
							<React.Fragment key={category.id}>
								<br />
								<input
									value={category.id}
									type="checkbox"
									onChange={handleCategoryChange}
								/>
								<span>{` ${category.id}  ${category.name}`}.</span>
							</React.Fragment>
						);
					})}
				</fieldset> <br />

				<fieldset className={styleCreateEvent.fieldset_form}>
					<legend className={styleCreateEvent.legend_form}>Seleccione Fecha:</legend>
					<button onClick={openModal} type="button"  className={styleCreateEvent.text_from} >
						Agregar fechas
					</button>
					<DatesModal isOpen={isOpenModal} closeModal={closeModal} className={styleCreateEvent.form_dates_modal}>
						<h3 className={styleCreateEvent.form_text_event}>Agregar fechas.</h3>

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
								<h5 className={styleCreateEvent.form_text_color}>$: {date.price}</h5>
								<h5 className={styleCreateEvent.form_text_color}>Fecha: {date.date}</h5>
							</React.Fragment>
						);
					})}
				</fieldset>
				<button type="submit" className={styleCreateEvent.bottom_form}>Create</button>
				</div>
			</form>
		</React.Fragment>
	);
};

export default CreateEvent;

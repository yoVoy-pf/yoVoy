import React, { SyntheticEvent, useEffect, useRef } from 'react';
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
import { useCreateEventMutation } from '../../slices/app/eventsApiSlice';
import styleCreateEvent from './create-event.module.css';
import { FiEdit } from 'react-icons/fi';
import styleUpdate from "../UpdateEvent/update-event.module.css"

const CreateEvent = () => {
	const locSelect = useRef<any>()
	const [isOpen, openModal, closeModal] = useDatesModal(false);
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

	const [
		input,
		resetState,
		handleInputChange,
		handleInputDateChange,
		currentDate,
		currentLocId,
		locsAux,
		isAlreadyAdded,
		handleAddDate,
		handleCategoryChange,
		handleLocationChange,
		handleConfirm,
		locsForSubmit,
		handleRemoveLoc,
		handleUpdateFetch,
		removeDateFromLocsAux,
		setCurrentLocId
	] = useCreateEvent({ locations });

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const event = {
			...input,
			locations: locsForSubmit,
		}
		try {
			await createEvent({ newEvent: event });
			resetState();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<React.Fragment>
			<form onSubmit={handleSubmit}>
				<div className={styleCreateEvent.form_order}>
					<fieldset className={styleCreateEvent.fieldset_form}>
						{/* <label htmlFor="name">Nombre del evento:</label> */}
						<legend className={styleCreateEvent.legend_form}>
							Nombre del evento:
						</legend>
						<input
							name="name"
							type="text"
							id="name"
							placeholder="Nombre del evento"
							className={styleCreateEvent.input_create}
							onChange={handleInputChange}
							value={input.name}
						/>
					</fieldset>{' '}
					<br />
					<fieldset className={styleCreateEvent.fieldset_form}>
						{/* <label htmlFor="description">Descripcion:</label> */}
						<legend className={styleCreateEvent.legend_form}>
							Descripcion:
						</legend>
						<textarea
							name="description"
							id="description"
							placeholder="Descripcion..."
							className={styleCreateEvent.input_create}
							onChange={handleInputChange}
							value={input.description}
						/>
					</fieldset>{' '}
					<br />
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
					</fieldset>{' '}
					<br />
					<fieldset className={styleCreateEvent.fieldset_form}>
						<legend className={styleCreateEvent.legend_form}>
							Seleccione las categorias:
						</legend>
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
					</fieldset>{' '}
					<fieldset className={styleCreateEvent.fieldset_form}>
						<legend className={styleCreateEvent.legend_form}>
							Localidades agregadas:
						</legend>
						{
							locsForSubmit.length > 0
								? locsForSubmit
									.map((loc: any) => {
										let locData = locations.find((location) => location.id === parseInt(loc.id));
										return locData ?
											(
												<div>
													<span>{` ${locData.name} `}</span>
													<span>{` ${locData.address} `}</span>
													{/* <button onClick={(e) => handleRemoveLoc(e,loc.id)}>X</button> */}
													<button
														onClick={() => {
															setCurrentLocId(loc.id)
															openModal()
														}}
														type="button"
														className={styleCreateEvent.text_from}
													>
														<FiEdit />
													</button>
													<ul>
														{loc.dates.map((date: any) => (
															<li key={date.date}>{`$${date.price} || ${date.date}`}</li>
														))}
													</ul>
												</div>
											)
											: null
									})
								: <h1>No hay localidades cargadas para el evento</h1>
						}
					</fieldset>{' '}
					<br />
					{/* MODAL */}
					<fieldset className={styleCreateEvent.fieldset_form}>
						<legend className={styleCreateEvent.legend_form}>
							Agrege detalles de el/los eventos
						</legend>
						<button
							onClick={() => openModal()}
							type="button"
							className={styleCreateEvent.text_from}
						>
							+
						</button>
						<DatesModal
							isOpen={isOpen}
							closeModal={closeModal}
							className={styleCreateEvent.form_dates_modal}
						>
							<div className={styleUpdate.container_modal}>
								<select
									name="id"
									ref={locSelect}
									placeholder="Seleccione un lugar"
									className={styleCreateEvent.form_cities}
									onChange={handleLocationChange}
								>
									<option value="default">Seleccione la ciudad...</option>
									{locations?.map((location: Location) => {
										return (
											<option
												key={location.id}
												value={location.id}
												className={`${styleCreateEvent.form_citie} ${isAlreadyAdded(location.id) ? styleCreateEvent.form_citie_loaded : null}`}
												selected={location.id === parseInt(currentLocId)}
											// disabled={isAlreadyAdded(location.id)}
											>
												{`-${location.id}, ${location.address}, ${location.name}, ${location.city['name']}.`}
											</option>
										);
									})}
								</select>
							</div>
							<div className={styleUpdate.container_pricedate}>
								<input
									name="price"
									type="number"
									value={currentDate?.price || '0'}
									placeholder="Indique el precio..."
									onChange={handleInputDateChange}
								/>
								<input type="date" name="date" value={currentDate?.date || ''} onChange={handleInputDateChange} />
								<button type="button" onClick={handleAddDate}>
									+
								</button>
							</div>

							<div>
								{locsAux[currentLocId]?.dates?.map((date: any, id: any) => {
									console.log(date)
									return (
										<fieldset className={styleCreateEvent.legend_form}>
											<ul>
												<li key={`${date.price} - ${date.date}`}>
													<React.Fragment>
														<p>{`Precio: ${date.price}`} </p>
														<p>{`Fecha: ${date.date}`} </p>
													</React.Fragment>
												</li>
											</ul>
											<React.Fragment>
												<button type="button" key={id} onClick={(e: SyntheticEvent) => removeDateFromLocsAux(id)}>X</button>
											</React.Fragment>
										</fieldset>
									);
								})}
							</div>
							<br />
							<div className={styleUpdate.container_create}>
								<button type="button" onClick={(e) => {
									let select = locSelect.current
									select.value = 'default'
									handleConfirm(e)
									closeModal()
								}}>
									Confirmar
								</button>
							</div>
						</DatesModal>
					</fieldset>{' '}
					{/* EN MODAL */}
					<button type="submit" className={styleCreateEvent.bottom_form}>
						Create
					</button>
				</div>
			</form>
		</React.Fragment>
	);
};

export default CreateEvent;

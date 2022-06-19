import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
	clearEventId,
	getEventId,
	getLocations,
} from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';
import { Dates, Location } from '../../types';
import NavBar from '../NavBar/NavBar';
import EventModal from './EventModal';
import { useEventModal } from './useEventModal';
import event_style from './Event.module.css';
import { selectCurrentUser } from '../../slices/authentication/authSlice';
import {
	useDeleteEventMutation,
	useAddEventToFavoriteMutation,
} from '../../slices/app/eventsApiSlice';

const Event = () => {
	const [isOpenModal, openModal, closeModal] = useEventModal(false);
	const [deleteEvent] = useDeleteEventMutation();
	const [addEventToFavorite] = useAddEventToFavoriteMutation();
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const currentUser: any = useSelector(selectCurrentUser);
	const eventDetail: any = useSelector(
		(state: State) => state.global.eventDetail,
	);
	const { id }: any = useParams<{ id: string }>();
	const { location }: any = useParams<{ location: string }>();

	useEffect(() => {
		dispatch(getEventId(id));

		return () => {
			dispatch(clearEventId());
		};
	}, [dispatch, id]);

	console.log('detalle del evento asdasd', location);

	const mapLocation = eventDetail.locations?.map((loc: any) => loc);
	const locationResult = mapLocation?.filter(
		(loc: Location) => loc.id == location,
	);

	return (
		<React.Fragment>
			{/* <nav>
				<NavBar />
			</nav> */}

			<div className={event_style.container}>
				<div className={event_style.div1}>
					<div className={event_style.h1}>
						<h1>Evento: {eventDetail.name}</h1>
					</div>
					<img
						className={event_style.img_event}
						src={eventDetail.background_image}
						alt={eventDetail.name}
					/>
					<div className={event_style.divpandsmall}>
						<p className={event_style.p}>Descripción del evento:</p>
						<small className={event_style.small}>
							{eventDetail.description}
						</small>
					</div>
				</div>

				<div className={event_style.div2}>
					{currentUser && (
						<div className={event_style.button_delete}>
							<button
								className={event_style.button_delete_style}
								onClick={() => deleteEvent(id).then(() => navigate('/'))}
							>
								Eliminar Evento
							</button>
							<button
								className={event_style.button_delete_style}
								onClick={() => navigate(`/update-event/${id}`)}
							>
								Actualizar Evento
							</button>
						</div>
					)}

					{eventDetail &&
						locationResult?.map((loc: Location) => {
							return (
								<React.Fragment key={loc.id}>
									<h4> 🏰 {loc.name}</h4>
									<small className={event_style.small1}>📍{loc.address},</small>
									<small className={event_style.small1}>
										{' '}
										{loc.city.name}.
									</small>
								</React.Fragment>
							);
						})}

					<button className={event_style.button1} onClick={openModal}>
						Ver todas las fechas y precios
					</button>
					<EventModal isOpen={isOpenModal} closeModal={closeModal}>
						<h3>TODAS LAS FECHAS Y PRECIOS</h3>
						<p>{eventDetail.name}</p>
						{console.log(eventDetail.locations)}
						{eventDetail.locations?.map((location: Location) => {
							return (
								<React.Fragment key={location.id}>
									{location?.dates.map((date: Dates) => {
										return (
											<React.Fragment key={date.id}>
												<h5>Precio: ${date.price}</h5>
												<h5>Fecha: {date.date as any}</h5>
											</React.Fragment>
										);
									})}
								</React.Fragment>
							);
						})}
					</EventModal>

					<button
						className={event_style.button2}
						onClick={() => addEventToFavorite({ eventId: id })}
					>
						Agregar a Favoritos ❤️
					</button>

					<hr />
					<button className={event_style.button2}>COMPRAR</button>
				</div>
			</div>
		</React.Fragment>
	);
};
export default Event;

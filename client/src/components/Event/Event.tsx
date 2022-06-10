import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearEventId, getEventId } from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';
import { Dates, Location } from '../../types';
import NavBar from '../NavBar/NavBar';
import EventModal from './EventModal';
import { useEventModal } from './useEventModal';

const Event = () => {
	const [isOpenModal, openModal, closeModal] = useEventModal(false);
	const dispatch: AppDispatch = useDispatch();
	const eventDetail: any = useSelector(
		(state: State) => state.global.eventDetail,
	);
	const { id }: any = useParams<{ id: string }>();

	useEffect(() => {
		dispatch(getEventId(id));
		return () => {
			dispatch(clearEventId());
		};
	}, [dispatch, id]);

	return (
		<React.Fragment>
			<nav>
				<NavBar />
			</nav>
			<br />
			<img src={eventDetail.background_image} alt={eventDetail.name} />
			<h1>Evento: {eventDetail.name}</h1>

			{eventDetail &&
				eventDetail.locations?.map((location: Location) => {
					return (
						<React.Fragment key={location.id}>
							{/*En los 2 siguientes h4, reemplazar Lugar: y Direc: por iconos =) */}
							<h4>Lugar: {location.name}</h4>
							<small>{location.address},</small>
							<small> {location.city.name}.</small>
							<h4>
								Direc: <small>{location.address}.</small>
							</h4>
						</React.Fragment>
					);
				})}
			<button onClick={openModal}>Ver todas las fechas y precios</button>
			<EventModal isOpen={isOpenModal} closeModal={closeModal}>
				<h3>TODAS LAS FECHAS Y PRECIOS</h3>
				<p>{eventDetail.name}</p>

				{eventDetail.locations?.map((location: Location) => {
					return (
						<React.Fragment>
							{location?.dates.map((date: Dates) => {
								return (
									<React.Fragment key={date.id}>
										<h5>Precio: ${date.price}</h5>
										<h5>Fecha: {date.date.toLocaleString()}</h5>
									</React.Fragment>
								);
							})}
						</React.Fragment>
					);
				})}
			</EventModal>
			<hr />
			<button>COMPRAR</button>
			<hr />
			<p>Descripción del evento:</p>
			<small>{eventDetail.description}</small>
		</React.Fragment>
	);
};
export default Event;

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearEventId, getEventId } from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';
import { Dates, Location } from '../../types';

const Event = () => {
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
			<img src={eventDetail.background_image} alt={eventDetail.name} />
			<h1>Evento: {eventDetail.name}</h1>

			{eventDetail &&
				eventDetail.locations?.map((location: Location) => {
					return (
						<React.Fragment key={location.id}>
							{/*En los 2 siguientes h4, reemplazar Lugar: y Direc: por iconos =) */}
							<h4>Lugar: {location.name}</h4>
							<h4>Direc: {location.address}</h4>
						</React.Fragment>
					);
				})}
			<button>Ver todas las fechas y precios</button>
			<hr />
			<button>COMPRAR</button>
			<hr />
			<small>{eventDetail.description}</small>
		</React.Fragment>
	);
};
export default Event;

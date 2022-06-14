import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllEvent } from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';
import { useDeleteEventMutation } from '../../slices/app/eventsApiSlice';

const EventsConfig = () => {
	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();
	const [deleteEvent] = useDeleteEventMutation();

	const allEvents = useSelector((state: State) => state.global.allEvents);

	useEffect(() => {
		dispatch(getAllEvent());
	}, [dispatch]);

	const HandleDelete = (event: any) => {
		if (window.confirm('Estas seguro que deseas eliminar el evento?')) {
			deleteEvent(event.id).then(() => navigate('/events-config'));
		}
	};

	return (
		<React.Fragment>
			<h1>Configurar Eventos</h1>
			{allEvents.map((event: any) => {
				return (
					<li key={event.id}>
						{event.id} {event.name}
						<button onClick={() => navigate(`/update-event/${event.id}`)}>
							Editar
						</button>
						<button onClick={() => HandleDelete(event)}>Eliminar</button>
					</li>
				);
			})}
			;
		</React.Fragment>
	);
};

export default EventsConfig;

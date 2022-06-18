import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDeleteEventMutation } from '../../slices/app/eventsApiSlice';
import { Event } from '../../types';

interface Props {
	event: Event;
}

const EventOrganization = ({ event }: Props) => {
	const [deleteEvent] = useDeleteEventMutation();
	const navigate = useNavigate();

	const HandleDelete = (event: any) => {
		if (window.confirm('Estas seguro que deseas eliminar el evento?')) {
			deleteEvent(event.id).then(() => navigate('/events-config'));
		}
	};

	return (
		<React.Fragment>
			<div key={event.id}>
				<h1>EVENTOS</h1>
				<h3>{event.name}</h3>
				<h4>{event.background_image}</h4>
				<Link to={`/update-event/${event.id}`}>
					<button>Editar</button>
				</Link>
				<button onClick={() => HandleDelete(event)}>Eliminar</button>
			</div>
		</React.Fragment>
	);
};

export default EventOrganization;

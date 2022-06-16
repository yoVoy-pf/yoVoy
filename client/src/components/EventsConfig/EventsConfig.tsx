import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllEvent } from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';
import { useDeleteEventMutation } from '../../slices/app/eventsApiSlice';
import styleConfigEvent from './event-config.module.css';

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
			<h1 style={{ textAlign: "center", color: "white" }}>Configurar Eventos</h1>
			<table className={styleConfigEvent.table_config}>
				<tbody>
					<tr>
					<th>ID</th>
					<th style={{ textAlign: "center" }}>Name</th>
					<th style={{ textAlign: "center" }}>Action</th>
					</tr>
			{allEvents.map((event: any, index: any) => {
				return (
						<tr>
							<th scope="row">{event.id}</th>
							{/* <td>{event.id}</td>	 */}
							<td className={styleConfigEvent.th_config}>{event.name}</td>
							<td>
								<button onClick={() => navigate(`/update-event/${event.id}`)}>
									Editar
								</button>
								<button onClick={() => HandleDelete(event)}>Eliminar</button>
							</td>
						</tr>
				);
			})}
				</tbody>
			</table>
			;
		</React.Fragment>
	);
};

export default EventsConfig;


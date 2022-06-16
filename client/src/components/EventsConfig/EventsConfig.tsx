import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
			<div style={{ marginTop: "30px" }}>
				<span className={styleConfigEvent.table_link}>
					<Link className={styleConfigEvent.table_link_style} to='/admin-panel' >Volver</Link>
				</span>
				<div className={styleConfigEvent.table_title}>
					<h1 className={styleConfigEvent.table_title_style} >Configurar Eventos</h1>
				</div>
			<table className={styleConfigEvent.table_config}>
					<thead>
						<tr>
						<th style={{ textAlign: "center" }}>ID</th>
						<th style={{ textAlign: "center" }}>Name</th>
						<th style={{ textAlign: "center" }}>Action</th>
						</tr>
					</thead>
				<tbody>
			{allEvents.map((event: any, index: any) => {
				return (
						<tr>
							<th scope="row" style={{ textAlign: "center" }}>{event.id}</th>
							{/* <td>{event.id}</td>	 */}
							<td className={styleConfigEvent.th_config}>{event.name}</td>
							<td className={styleConfigEvent.th_config}>
							<Link to={`/update-event/${event.id}`} className={styleConfigEvent.buttom}>
								<button className={styleConfigEvent.buttom_style_left}>Editar</button>
							</Link>
								<button 
								className={styleConfigEvent.buttom_style_right}
								onClick={() => HandleDelete(event)}
								>
									Eliminar
								</button>
							</td>
						</tr>
				);
			})}
				</tbody>
			</table>
			</div>
			;
		</React.Fragment>
	);
};

export default EventsConfig;


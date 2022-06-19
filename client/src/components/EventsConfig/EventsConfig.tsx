import React from 'react';
import { Link} from 'react-router-dom';
import { useDeleteEventMutation } from '../../slices/app/eventsApiSlice';
import SideBar from '../SideBar/SideBar';
import styleConfigEvent from './event-config.module.css';
import { useGetEventsQuery } from '../../slices/app/eventsApiSlice';

const EventsConfig = () => {
	const [deleteEvent] = useDeleteEventMutation();
	const{
		data: events,
		isLoading,
		isSuccess,
		isError,
		error,
		refetch
	  } = useGetEventsQuery({_:''}, {refetchOnMountOrArgChange: true,})

	const HandleDelete = (event: any) => {
		if (window.confirm('Estas seguro que deseas eliminar el evento?')) {
			deleteEvent(event.id);
			refetch()
			alert('Evento eliminado correactamente')
		}
	};

	return (
		<React.Fragment>
			<div>
				<SideBar/>
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
			{events?.map((event: any, index: any) => {
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
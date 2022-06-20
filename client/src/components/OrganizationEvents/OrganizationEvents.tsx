import { Link } from 'react-router-dom';
import { useGetOrganizationEventsQuery } from '../../slices/app/organizationApiSlice';
import { useDeleteEventMutation } from '../../slices/app/eventsApiSlice';
import './organization-event.css'

const OrganizationEvents = () => {
	const [deleteEvent] = useDeleteEventMutation();
	let { data: events, refetch, isFetching } = useGetOrganizationEventsQuery(
		{ _: '' },
		{ refetchOnMountOrArgChange: true },
	);
	const handleDelete = async (id: any) => {
		if (
		  window.confirm('Seguro que quieres eliminar este Evento ?')
		){
		  await deleteEvent(id)
		  refetch()
		  alert('Evento eliminado correactamente')
		}
	  }
	const content = isFetching ? (
		<h1>Cargando...</h1>
	) : (
		<div>
			<span>
				<Link to='/create-event'><button className='btn-event-organization'>Crear Evento</button></Link>
			</span>
			<div>
         		 <h1 style={{color: 'white', textAlign:'center'}}>Lista de Eventos</h1>
        	</div>
			<div className='cards-event-organization'>
				{
					events?.map((event:any) => {
					return(
						<div className='card-organization-event'>
						<fieldset className='fieldset-event-organization '>
						<legend className='legend-event-organization'>Evento:</legend>
						<h2 style={{color: 'white'}}>{event.name}</h2>
						<img src={event.background_image} alt={event.name} style={{width:'250px', height: '250px'}}/>
						<div style={{textAlign: 'center'}}></div>
						<Link to={`/update-event/${event.id}`}>
						<button className='button-event-organization'>Editar</button>
						</Link>
						<button
						className='button-event-organization'
						onClick={()=> handleDelete(event.id)}
						>
						Eliminar
						</button>
						</fieldset>
						</div>
					)})
				}
			</div>
		</div>
	);
	return <div>{content}</div>;
};

export default OrganizationEvents;

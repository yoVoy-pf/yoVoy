import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearEventId, getEventId } from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';
import { Dates, Location } from '../../types';
import EventModal from './EventModal';
import { useEventModal } from './useEventModal';
import event_style from './Event.module.css';
import { selectCurrentUser } from '../../slices/authentication/authSlice';
import {
	useDeleteEventMutation,
	useAddEventToFavoriteMutation,
} from '../../slices/app/eventsApiSlice';
import Swal from 'sweetalert2';

const Event = () => {
	const [isOpenModal, openModal, closeModal] = useEventModal(false);
	const [isOpenAddFavMsg, openAddFavMsg, closeAddFavMsg] = useEventModal(false);
	const [deleteEvent] = useDeleteEventMutation();
	const [addEventToFavorite] = useAddEventToFavoriteMutation();
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const currentUser: any = useSelector(selectCurrentUser);
	const eventDetail: any = useSelector(
		(state: State) => state.global.eventDetail,
	);
	const { id }: any = useParams<{ id: string }>();

	const state: any = useSelector((state: State) => state)
	const [isVisible, setIsVisible] = useState("hide")

	const { location }: any = useParams<{ location: string }>();

	useEffect(() => {
		dispatch(getEventId(id));

		return () => {
			dispatch(clearEventId());
		};
	}, [dispatch, id]);

	useEffect(() => {
		setTimeout(() => {
			setIsVisible('hide');
		}, 3000);
	}, [isVisible]);

	useEffect(() => {
		setTimeout(() => { setIsVisible("hide") }, 3000)
	}, [isVisible])


	const addFavorites = (id: any) => {
		const addF = addEventToFavorite(id).then((result: any) => {
			if (result.error) {
				if (result.error.data.includes("llave duplicada")) {
					setIsVisible("visible")
				} else if (result.error.data.includes("You need a valid token")) {
					alert("Debe iniciar sesión")
				}
			} else {
				openAddFavMsg()
			}
		});
	};

	const handleDelete = async (id: any) => {
		Swal.fire({
			title: 'Esta seguro de eliminar el Evento?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'orange',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar',
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: 'Evento Eliminado!',
					icon: 'success',
				});
				deleteEvent(id).then(() => navigate('/'));
			}
		});
	};
	console.log('detalle del evento asdasd', location);

	const mapLocation = eventDetail.locations?.map((loc: any) => loc);
	const locationResult = mapLocation?.filter(
		(loc: Location) => loc.id == location,
	);
	console.log(locationResult)


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
					<div className={event_style.divDeImg}>
						<img className={event_style.img}
							// style={{width:'550px', height: '250px'}}
							src={eventDetail.background_image}
							alt={eventDetail.name}
						/>

					</div>
					<div className={event_style.divpandsmall}>
						<p className={event_style.p}>Descripción del evento:</p>
						<small className={event_style.small}>
							{eventDetail.description}
						</small>
					</div>
				</div>

				<div className={event_style.div2}>
					{currentUser?.rolesId?.includes(3030) && (
						<div className={event_style.button_delete}>
							<button
								className={event_style.button_delete_style}
								onClick={handleDelete}
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
							return (<div className={event_style.location}>

								<React.Fragment key={loc.id}>
									<h4> 🏰 {loc.name}</h4>
									<small className={event_style.small1}>📍{loc.address},</small>
									<small className={event_style.small1}>
										{' '}
										{loc.city.name}.
									</small>
								</React.Fragment>
							</div>
							);
						})}

					<button className={event_style.button1} onClick={openModal}>
						Ver todas las fechas y precios
					</button>
					<EventModal isOpen={isOpenModal} closeModal={closeModal}>
						<h3>TODAS LAS FECHAS Y PRECIOS</h3>
						<p>{eventDetail.name}</p>
						{locationResult?.map((location: Location) => {
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
						onClick={() => {
							addFavorites({ eventId: id });
						}}
					>
						Agregar a Favoritos ❤️
					</button>
					<label
						className={
							isVisible === 'visible' ? event_style.visible : event_style.hide
						}
					>
						Ya está en Favoritos
					</label>
					<EventModal isOpen={isOpenAddFavMsg} closeModal={closeAddFavMsg}>
						<h1>Agregado a favoritos</h1>
					</EventModal>
					<hr />
					<button className={event_style.button2}>COMPRAR</button>
				</div>
			</div>
		</React.Fragment>
	);
};
export default Event;

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearEventId, getEventId } from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';

const Event = () => {
	const dispatch: AppDispatch = useDispatch();
	const eventId: any = useSelector((state: State) => state.eventId);
	const { id }: any = useParams<{ id: string }>();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getEventId(id));
		// dispatch(clearEventId());
	}, [dispatch, id]);

	useEffect(() => {
		if (eventId.length === 0) {
			navigate('/home');
		}
	});

	return (
		<div>
			{
				<div>
					<h1>{eventId.name}</h1>
					<img src={eventId.background_image} alt={eventId.name} />
					<br />

					<small>{eventId.description}</small>
					<h1>Aca van las fechas del evento</h1>
				</div>
			}
		</div>
	);
};
export default Event;

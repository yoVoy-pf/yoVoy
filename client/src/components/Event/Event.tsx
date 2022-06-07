import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEventId } from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';

const Event = () => {
	const dispatch: AppDispatch = useDispatch();
	const eventDetails: any = useSelector((state: State) => state.eventDetails);
	const { id }: any = useParams<{ id: string }>();

	useEffect(() => {
		dispatch(getEventId(id));
	}, [dispatch, id]);

	return (
		<div>
			{
				<div>
					<h1>{eventDetails.name}</h1>
					<img src={eventDetails.background_image} alt={eventDetails.name} />
					<br />

					<small>{eventDetails.description}</small>
					<h1>Aca van las fechas del evento</h1>
				</div>
			}
		</div>
	);
};
export default Event;

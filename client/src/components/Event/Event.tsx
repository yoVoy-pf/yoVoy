import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEventId } from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';

const Event = () => {
	const dispatch: AppDispatch = useDispatch();
	const eventDetail: any = useSelector((state: State) => state.eventDetail);
	const { id }: any = useParams<{ id: string }>();

	useEffect(() => {
		dispatch(getEventId(id));
	}, [dispatch, id]);
	console.log(eventDetail);

	return (
		<div>
			{
				<div>
					<h1>{eventDetail.name}</h1>
					<img src={eventDetail.background_image} alt={eventDetail.name} />
					<br />

					<small>{eventDetail.description}</small>
					<h1>Aca van las fechas del evento</h1>
				</div>
			}
		</div>
	);
};
export default Event;

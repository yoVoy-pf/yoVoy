import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearEventId, getEventId } from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';
import { Location } from '../../types';

const Event = () => {
	const dispatch: AppDispatch = useDispatch();
	const eventDetail: any = useSelector((state: State) => state.eventDetail);
	const { id }: any = useParams<{ id: string }>();

	useEffect(() => {
		dispatch(getEventId(id));
		return () => {
			dispatch(clearEventId());
		};
	}, [dispatch, id]);

	return (
		<React.Fragment>
			<img src={eventDetail.background_image} alt={eventDetail.name} />
			<h1>{eventDetail.name}</h1>

			<br />
			<h4>Precios</h4>
			{eventDetail &&
				eventDetail.locations?.map((location: Location) => {
					return (
						<div key={location.id}>
							<p>-{location.name}</p>
							<p>-{location.address}</p>
						</div>
					);
				})}

			<small>{eventDetail.description}</small>
		</React.Fragment>
	);
};
export default Event;

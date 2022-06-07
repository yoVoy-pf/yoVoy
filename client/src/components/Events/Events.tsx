import React from 'react';
import { Event } from '../../types';
import Card from '../Card/Card';

interface Props {
	allEvents: Array<Event>;
}

const Events = ({ allEvents }: Props) => {
	console.log(allEvents);
	const renderEvents = (): JSX.Element[] => {
		return allEvents.map((event) => {
			return <Card key={event.id} event={event} />;
		});
	};

	return <div>{renderEvents()}</div>;
};

export default Events;

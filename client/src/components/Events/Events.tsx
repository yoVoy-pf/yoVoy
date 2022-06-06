import React from 'react';
import { Event } from '../../types';
import Card from '../Card/Card';

interface Props {
	allEvents: Array<Event>;
}

const Events = ({ allEvents }: Props) => {
	// const renderEvents = (): JSX.Element[] => {
	//   return allEvents.map((event) => {
	//     return event>
	//   })
	// }

	return <div>Events</div>;
};

export default Events;

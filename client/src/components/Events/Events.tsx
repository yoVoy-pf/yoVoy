import React from 'react';
import { Event } from '../../types';
import Card from '../Card/Card';
import style from "./Events.module.css"

interface Props {
	allEvents: Array<Event>;
}

const Events = ({ allEvents }: Props) => {
	const renderEvents = (): JSX.Element[] => {
		return allEvents?.map((event) => {
			return <Card key={event.id} event={event} />
		});
	};

	return <div className={style.container}>{renderEvents()}</div>;
};

export default Events;

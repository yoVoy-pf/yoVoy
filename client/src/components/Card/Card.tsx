import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../../types';
import './Card.css';

interface Props {
	event: Event;
}

const Card = ({ event }: Props) => {
	return (
		<React.Fragment>
			<Link to={`/events/${event.id}`}>
				<ul>
					<img src={event.background_image} alt={event.name} />
					<li key={event.id}>
						<h4>{event.name}</h4>
						<p>{event.description?.substring(0, 100)}...</p>
					</li>
				</ul>
			</Link>
		</React.Fragment>
	);
};

export default Card;

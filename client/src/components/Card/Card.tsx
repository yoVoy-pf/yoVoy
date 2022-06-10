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
			<Link className='Card_a' to={`/events/${event.id}`}>
			<div className='Card_bg'>
				<ul className='bg-ul'>
					<img width="250px" height="250px" src={event.background_image} alt={event.name} />
					<li className='Card_bg_li' key={event.id}>
						<h4>{event.name}</h4>
						<p>{event.description?.substring(0, 100)}...</p>
					</li>
				</ul>

			</div>
			</Link>
		</React.Fragment>
	);
};

export default Card;

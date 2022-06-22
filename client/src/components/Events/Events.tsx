import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../../types';
import Card from '../Card/Card';
import style from "./Events.module.css"

interface Props {
	allEvents: Array<Event>;
}



const Events = ({ allEvents }: Props) => {
	const allEventsPrueba1 = allEvents[0]
	const allEventsPrueba2 = allEvents[1]

	const renderEvents = (): JSX.Element[] => {
		return allEvents?.slice(2).map((event) => {
			return <Card key={event.id} event={event} />
		});
	};

	return (
		<div>
			<div className={style.div1}>
				<Link to={`/events/${allEventsPrueba1?.id}`}>
					<div className={style.divhover}>
						<img src={allEventsPrueba1?.background_image} alt="" />
						<div className={style.divdeprueba}>
							<div >
								<h1>{allEventsPrueba1?.name}</h1>
							</div>
							<div className={style.diva} >
								<a href="#">Más Informarcíon</a>
							</div>

						</div>
					</div>
				</Link>
				{allEvents && allEvents.length > 1? <Link to={`/events/${allEventsPrueba2?.id}`}>
					<div className={style.divhover}>
						<img src={allEventsPrueba2?.background_image} alt="" />
						<div className={style.divdeprueba}>
							<div>
								<h1>{allEventsPrueba2?.name}</h1>

							</div>
							<div >
								<a href="#">Más Informarcíon</a>

							</div>
						</div>
					</div>
				</Link> : null}
			</div>

			<div className={style.container}>
				{renderEvents()}
			</div>

		</div>
	)
};

export default Events;

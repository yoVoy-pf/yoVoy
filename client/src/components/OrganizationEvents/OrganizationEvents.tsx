import { useEffect, useState } from 'react';
import { useGetOrganizationEventsQuery } from '../../slices/app/organizationApiSlice';
import EventOrganization from '../EventOrganization/EventOrganization';

const OrganizationEvents = () => {
	const [events, setEvents] = useState<any>([]);
	let { data, isError, isFetching } = useGetOrganizationEventsQuery(
		{ _: '' },
		{ refetchOnMountOrArgChange: true },
	);
	useEffect(() => {
		console.log('dataaaa', data);
		if (!isFetching) {
			isError
				? setEvents(['La Organización no poseé ningun evento'])
				: setEvents(data);
		}
	}, [isFetching]);

	const content = isFetching ? (
		<h1>Cargando...</h1>
	) : (
		<div>
			<h1>
				{events &&
					events?.length > 0 &&
					events?.map((event: any) => {
						if (event == 'La Organización no poseé ningun evento') {
							return (
								<div key="La Organización no poseé ningun evento">
									<h1>La Organización no poseé ningun evento</h1>
								</div>
							);
						} else return <EventOrganization event={event} key={event.id} />;
					})}
			</h1>
		</div>
	);
	return <div>{content}</div>;
};

export default OrganizationEvents;

import { useEffect, useState } from 'react';
import { useGetTicketsQuery } from '../../slices/app/usersApiSlice';
import Tickets from '../Tickets/Tickets';

const UserPurchaseDetail = () => {
	const [tickets, setTickets] = useState<any>([]);
	let { data, isError, isFetching } = useGetTicketsQuery(
		{ _: '' },
		{ refetchOnMountOrArgChange: true },
	);
	useEffect(() => {
		if (!isFetching) {
			isError ? setTickets(['No hay Tickets']) : setTickets(data);
		}
	}, [isFetching]);

	const content = isFetching ? (
		<h1>Cargando...</h1>
	) : (
		<div>
			<h1>
				{tickets &&
					tickets?.length > 0 &&
					tickets?.map((ticket: any) => {
						if (ticket == 'No hay Tickets') {
							return (
								<div key="No hay Tickets">
									<h1 style={{ color: 'white', textAlign: "center" }}>No hay Tickets</h1>
								</div>
							);
						} else return <Tickets ticket={ticket} />;
					})}
			</h1>
		</div>
	);
	return <div>{content}</div>;
};

export default UserPurchaseDetail;

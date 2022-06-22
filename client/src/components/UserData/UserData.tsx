import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserDataQuery } from '../../slices/app/usersApiSlice';

const UserData = () => {
	let { data, isError, isFetching, refetch } = useGetUserDataQuery(
		{ _: '' },
		{ refetchOnMountOrArgChange: true },
	);
	return (
		<div>
			<h1>Informacion del Usuario</h1>
			<h4>Nombre: {data?.name}</h4>
			<h4>Email: {data?.email}</h4>
			{data?.organization ? (
				<h4>Organización: {data?.organization.name}</h4>
			) : (
				<h4>Organización: No tiene ninguna Organización</h4>
			)}
		</div>
	);
};

export default UserData;

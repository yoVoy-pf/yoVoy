import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserDataQuery } from '../../slices/app/usersApiSlice';
import userStyle from "./UserData.module.css"
import { BsFillEnvelopeFill } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { BsFillInfoCircleFill } from "react-icons/bs";


const UserData = () => {
	let { data, isError, isFetching, refetch } = useGetUserDataQuery(
		{ _: '' },
		{ refetchOnMountOrArgChange: true },
	);
	return (
		<div className={userStyle.container}>
			<div className={userStyle.container_h1}>
				<h1>Información del Usuario</h1>
			</div>
			<div className={userStyle.container_p_h4}>
				<div className={userStyle.bg1}>

					<div className={userStyle.into_p_h4}>
						<BsPerson className={userStyle.icon2}/>
						<h4>Nombre: {data?.name}</h4>

					</div>
					<div className={userStyle.into_p_h4}>
						<BsFillEnvelopeFill className={userStyle.icon2}/>
						<h4>Email: {data?.email}</h4>
					</div>
				</div>

			</div>

			{data?.organization ? (
				<div className={userStyle.container_org}>
					<BsFillInfoCircleFill className={userStyle.icon3}/>
					<h4>Organización: {data?.organization.name}</h4>
				</div>
			) : (
				<div className={userStyle.container_org}>
					<BsFillInfoCircleFill className={userStyle.icon3}/>
					<h4>Organización: No tiene ninguna Organización</h4>
				</div>
			)}
		</div>
	);
};

export default UserData;

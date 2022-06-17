import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	useGetUserQuery,
	useUpdateRolUserMutation,
} from '../../slices/app/usersApiSlice';

const UpdateRol = () => {
    const [updateRolUser] = useUpdateRolUserMutation();
	const { id }: any = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { data, error, refetch } = useGetUserQuery(id);
	const [user, setUser] = useState({
        id: '',
        roles: ''
	});
	useEffect(() => {
        let mape = data?.roles.map((e:any) => e.id);
        setUser({
            id: data?.id || '',
            roles: mape || ''
        });
	}, [id, data]);
	const onChangeRol = (e: any) => {    
		e.preventDefault();
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};
	const onChangeUser = (e: any) => {
		e.preventDefault();
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			id && (await updateRolUser({ userId: user.id, roleId: user.roles }));
			refetch();
			setUser({
                id: '',
                roles: ''
			});
			navigate('/userslist');
		} catch (error) {
			console.log(error);
		}
	};
    return (               
        <div>                                    
            <form onSubmit={onSubmit}>
            <div>
					<fieldset>
						<legend>Id usuario:</legend>
						<input
							type="text"
							name="id"
							value={user.id}
							onChange={onChangeUser}
						/>
					</fieldset>
					<br />
					<fieldset>
						<legend>Rol:</legend>
						<input
							type="text"
							name="roles"
							value={user.roles}
							onChange={onChangeRol}
						/>
					</fieldset>
					<button
						type="submit"
					>
						Actualizar Rol de Usuario
					</button>
				</div>
            </form>
        </div>
    )
}

export default UpdateRol

function roles(id: any, arg1: any, roles: any, arg3: any) {
    throw new Error('Function not implemented.');
}

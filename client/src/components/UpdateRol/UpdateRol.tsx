import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	useGetUserQuery,
	useUpdateRolUserMutation,
} from '../../slices/app/usersApiSlice';
import ROLES_LIST from '../../slices/authentication/rolesList';

const UpdateRol = () => {
    const [updateRolUser] = useUpdateRolUserMutation();
	const { id }: any = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { data, error, refetch } = useGetUserQuery(id);
	const [user, setUser] = useState({
        name: '',
        roles: ''
	});
	let mappeRoles = data?.roles.map((e:any) => e.id );
	let order = mappeRoles?.sort((a:any, b:any)=>  a - b );
	let admin = order?.pop()
		console.log('fasdfsafsad',admin)
	useEffect(() => {
        
		setUser({
            name: data?.name || '',
            roles: mappeRoles || ''
        });
	}, [id, data]);
	const onChangeRol = (e: any) => {    
		e.preventDefault();
		setUser({
			...user,
			roles: e.target.value,
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
			id && (await updateRolUser({ userId: user.name = data?.id , roleId: user.roles}))
			refetch();
			setUser({
                name: '',
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
							value={user.name}
							onChange={onChangeUser}
						/>
					</fieldset>
					<br />
					<select onChange={(e)=> onChangeRol(e)}>
						<option value={ROLES_LIST.Admin} selected={ROLES_LIST.Admin === admin}>Administrador</option>
						<option value={ROLES_LIST.Organization} selected={ROLES_LIST.Organization === admin}>Organizacion</option>
						<option value={ROLES_LIST.User} selected={ROLES_LIST.User === admin}>Usuario</option>
					</select> <br /><br />
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
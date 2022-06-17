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
        roleId: []
	});

	useEffect(() => {
		if (id) {
			if (data) {
				setUser({ ...data });
			}
		} else {
			console.log(error);
		}
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
			id && (await updateRolUser({ updateUser: user }));
			refetch();
			setUser({
                id: '',
                roleId: []
			});
			navigate('/userslist');
		} catch (error) {
			console.log(error);
		}
	};
    return (
        <div>
            <form>
            <div>
					<fieldset>
						<legend>Nombre:</legend>
						<input
							type="text"
							name="name"
							value={user.id}
							onChange={onChangeUser}
						/>
					</fieldset>
					<br />
					<fieldset>
						<legend>Email:</legend>
						<input
							type="text"
							name="email"
							value={user.roleId}
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
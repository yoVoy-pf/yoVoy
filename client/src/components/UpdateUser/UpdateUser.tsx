import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	useGetUserQuery,
	useUpdateUserMutation,
} from '../../slices/app/usersApiSlice';
import styleUser from './update-user.module.css';
import { validateEmail, validateUser } from './UpdateUserValidate';

const Updateuser = () => {
	const [updateUser] = useUpdateUserMutation();
	const { id }: any = useParams<{ id: string }>();
	const [errorsUser, setErrorsUser]: any = useState({});
	const [errorsEmail, setErrorsEmail]: any = useState({});
	const navigate = useNavigate();
	const { data, error, refetch } = useGetUserQuery(id);
	const [user, setUser] = useState({
		name: '',
		email: '',
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

	const onChangeEmail = (e: any) => {
		e.preventDefault();
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
		setErrorsEmail(validateEmail({ ...user, [e.target.name]: e.target.value }));
	};
	const onChangeUser = (e: any) => {
		e.preventDefault();
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
		setErrorsUser(validateUser({ ...user, [e.target.name]: e.target.value }));
	};
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			id && (await updateUser({ id: id, updateUser: user }));
			refetch();
			setUser({
				name: '',
				email: '',
			});
			navigate('/userslist');
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className={styleUser.form_user}>
					<fieldset>
						<legend>Nombre:</legend>
						<input
							type="text"
							name="name"
							autoComplete="off"
							className={styleUser.inputs_user}
							value={user.name}
							onChange={onChangeUser}
						/>
						{errorsUser.name && <p>{errorsUser.name}</p>}
					</fieldset>{' '}
					<br />
					<fieldset>
						<legend>Email:</legend>
						<input
							type="text"
							name="email"
							autoComplete="off"
							className={styleUser.inputs_user}
							value={user.email}
							onChange={onChangeEmail}
						/>
						{errorsEmail.email && <p>{errorsEmail.email}</p>}
					</fieldset>
					<button
						type="submit"
						className={styleUser.button_user}
						disabled={
							Object.keys(errorsEmail).length > 0 ||
							Object.keys(errorsUser).length > 0 ||
							errorsEmail.email ||
							errorsUser.name
								? true
								: false
						}
					>
						Actualizar Usuario
					</button>
				</div>
			</form>
		</div>
	);
};

export default Updateuser;

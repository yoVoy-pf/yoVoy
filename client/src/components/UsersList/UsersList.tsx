import { useGetUsersQuery } from '../../slices/app/usersApiSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styleUserList from './user-list.module.css';
import { useDeleteUserMutation } from '../../slices/app/usersApiSlice';
import { useEffect } from 'react';
import SideBar from '../SideBar/SideBar';
import Swal from 'sweetalert2';
import SearchUser from './SearchUser';
import { useSelector } from 'react-redux';
import { AppDispatch, State } from '../../redux/store/store';
import { useDispatch } from 'react-redux';
import { getSearchUser } from '../../redux/actions/actions-Create'
import FilterUser from './FilterUser';

const UsersList = () => {
	const [deleteUser] = useDeleteUserMutation();
	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();
	const searchUser: any = useSelector((state: State) => state.global.userSearch)
	let algo: string = 'hola mundo';
	const {
		data: users,
		isLoading,
		isSuccess,
		isError,
		error,
		refetch,
	} = useGetUsersQuery({ _: '' }, { refetchOnMountOrArgChange: true });

	useEffect((): any=> {
		return() => dispatch(getSearchUser({data: []}))
	}, [])
	
	const handleDelete = async (id: any) => {
		// if (
		//   window.confirm('Seguro que quieres eliminar este usuario?')
		// ){
		//   await deleteUser(id)
		//   refetch()
		//   alert('Usuario eliminado correactamente')
		// }
		Swal.fire({
			title: 'Esta seguro de eliminar el Usuario?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'orange',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar',
		}).then(async (result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: 'Usuario Eliminado!',
					icon: 'success',
				});
				await deleteUser(id);
				refetch();
			}
		});
	};

	let content = <span></span>;
	if (isLoading) {
		content = <p>Cargando...</p>;
	} else if (isSuccess) {
		content = (
			<div className={styleUserList.fondo}>
        <SideBar/>
		<div>
        <div className={styleUserList.table_title}>
          <h1 className={styleUserList.table_title_style} >Lista de usuarios</h1>
		</div>
		<span style={{ textAlign: "center" }}>
			<SearchUser/>
			<div className={styleUserList.filters}>
				<FilterUser/>
			</div>
		</span>
		</div>
      <table className={styleUserList.table_users}>
          <thead className={styleUserList.thead_dark}>
            <tr>
              <th style={{ textAlign: "center" }}>ID</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Email</th>
              <th style={{ textAlign: "center" }}>Roles</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>

          <tbody>
			{
				searchUser.length === 0 ? (users?.map((user: any, index: any) => {
					return (
					  <tr key={user.id} className={styleUserList.componente}>
						<th scope="row" style={{ textAlign: "center", backgroundColor: '#000450'}}>{user.id}</th>
						<td className={styleUserList.th_users}>{user.name}</td>
						<td className={styleUserList.th_users}>{user.email}</td>
						<td className={styleUserList.th_users}>{user.roles.map((e:any) => e.name + ' ')}</td>
						<td className={styleUserList.th_users}>
						  <Link to={`/update-user/${user.id}`} className={styleUserList.buttom}>
							<button className={styleUserList.buttom_style_left}>Editar Usuario</button>
						  </Link>
						  <button
						  className={styleUserList.buttom_style_right}
						  onClick={()=> handleDelete(user.id)}
						  >
							Eliminar
						  </button>
						</td>
					  </tr>
					  );
					})) : searchUser?.map((user: any, index: any) => {
						return (
						  <tr key={user.id} className={styleUserList.componente}>
							<th scope="row" style={{ textAlign: "center", backgroundColor: '#000450'}}>{user.id}</th>
							<td className={styleUserList.th_users}>{user.name}</td>
							<td className={styleUserList.th_users}>{user.email}</td>
							<td className={styleUserList.th_users}>{user.roles.map((e:any) => e.name + ' ')}</td>
							<td className={styleUserList.th_users}>
							  <Link to={`/update-user/${user.id}`} className={styleUserList.buttom}>
								<button className={styleUserList.buttom_style_left}>Editar Usuario</button>
							  </Link>
							  <button
							  className={styleUserList.buttom_style_right}
							  onClick={()=> handleDelete(user.id)}
							  >
								Eliminar
							  </button>
							</td>
						  </tr>
						  );
						})
			}
          {/* {users?.map((user: any, index: any) => {
            return (
              <tr key={user.id} className={styleUserList.componente}>
                <th scope="row" style={{ textAlign: "center", backgroundColor: '#000450'}}>{user.id}</th>
                <td className={styleUserList.th_users}>{user.name}</td>
                <td className={styleUserList.th_users}>{user.email}</td>
                <td className={styleUserList.th_users}>{user.roles.map((e:any) => e.name + ' ')}</td>
                <td className={styleUserList.th_users}>
                  <Link to={`/update-user/${user.id}`} className={styleUserList.buttom}>
                    <button className={styleUserList.buttom_style_left}>Editar Usuario</button>
                  </Link>
                  <button
                  className={styleUserList.buttom_style_right}
                  onClick={()=> handleDelete(user.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
              );
            })} */}
            </tbody>
        </table>
      </div>
		);
	} else if (isError) {
		content = <p>{JSON.stringify(error)}</p>;
	}
	return content;
};

export default UsersList;

import { useGetUsersQuery } from "../../slices/app/usersApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import styleUserList from './user-list.module.css'
import { useDeleteUserMutation } from "../../slices/app/usersApiSlice";
import { useEffect } from "react";

const UsersList = () => {
  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();
  let algo: string = 'hola mundo'
  const{
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch
  } = useGetUsersQuery({_:''}, {refetchOnMountOrArgChange: true,})

  const handleDelete = async (id: any) => {
    if (
      window.confirm('Seguro que quieres eliminar este usuario?')
    ){
      await deleteUser(id)
      refetch()
      alert('Usuario eliminado correactamente')
    }
  }

  let content = <span></span>;
  if (isLoading){
    content = <p>Cargando...</p>
  } else if (isSuccess){
    content = (
      <div style={{ marginTop: "30px" }}>
          <span className={styleUserList.table_link}>
            <Link className={styleUserList.table_link_style} to='/admin-panel' >Volver</Link>
          </span>
        <div className={styleUserList.table_title}>
          <h1 className={styleUserList.table_title_style} >Lista de usuarios</h1>
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
          {users?.map((user: any, index: any) => {
            return (
              <tr key={user.id}>
                <th scope="row" style={{ textAlign: "center" }}>{index + 1}</th>
                <td className={styleUserList.th_users}>{user.name}</td>
                <td className={styleUserList.th_users}>{user.email}</td>
                <td className={styleUserList.th_users}>{user.roles.map((e:any) => e.name + ' ')}</td>
                <td className={styleUserList.th_users}>
                  <Link to={`/update-user/${user.id}`} className={styleUserList.buttom}>
                    <button className={styleUserList.buttom_style_left}>Editar</button>
                  </Link>
                  <button
                  className={styleUserList.buttom_style_right}
                  onClick={()=> handleDelete(user.id)}
                  >
                    Eliminar
                  </button>
                  {/* <Link to={`/user-detail/${user.id}`}>
                    <button>
                      View
                    </button>
                  </Link> */}
                </td>
              </tr>
              );
            })}
            </tbody>
        </table>
      </div>
    )
  } else if (isError){
    content = <p>{JSON.stringify(error)}</p>
  }
  return content
}

export default UsersList
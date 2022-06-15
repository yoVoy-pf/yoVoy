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
    content = <p>Loading...</p>
  } else if (isSuccess){
    content = (
      <div style={{ marginTop: "100px" }}>
      <table className={styleUserList.table_users}>
          <tbody>
          <tr>
            <th></th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Roles</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
      

          {users?.map((user: any, index: any) => {
            return (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td className={styleUserList.th_users}>{user.name}</td>
                <td className={styleUserList.th_users}>{user.email}</td>
                <td className={styleUserList.th_users}>{user.roles.map((e:any) => e.name + ' ')}</td>
                <td className={styleUserList.th_users}>
                  <Link to={`/update-user/${user.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button
                  onClick={()=> handleDelete(user.id)}
                  >
                    Delete
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
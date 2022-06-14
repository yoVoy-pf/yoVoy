import { useGetUsersQuery } from "../../slices/app/usersApiSlice";
import { Link } from "react-router-dom";
import styleUserList from './user-list.module.css'

const UsersList = () => {
  const{
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery()

  let content = <span></span>;
  if (isLoading){
    content = <p>Loading...</p>
  } else if (isSuccess){
    content = (
      <div style={{ marginTop: "100px" }}>
      <table className={styleUserList.table_users}>
  
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
                <td className={styleUserList.th_users}>{user.roles.map((e:any) => e.name)}</td>
                <td className={styleUserList.th_users}>
                  <Link to={`/update-user/${user.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button>
                    Delete
                  </button>
                  <Link to={`/user-detail/${user.id}`}>
                    <button>
                      View
                    </button>
                  </Link>
                </td>
              </tr>
              );
            })}
        </table>
      </div>
    )
  } else if (isError){
    content = <p>{JSON.stringify(error)}</p>
  }
  return content
}

export default UsersList
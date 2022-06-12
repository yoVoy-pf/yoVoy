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
      <section>
        <div className={styleUserList.user_list}>
        <div className={styleUserList.text_user_list}>
          <h1>Users List</h1>
        </div>
        <div className={styleUserList.text_user_list}>
          <div className={styleUserList.list_user}>
            <ul>
              {users.map((user: any, i: number) => {
                return <li key={i}>{user.name}</li>
              })}
            </ul>
          </div>
        </div>
        <div>
        <Link to='/welcome'>Back to Welcome</Link>
        </div>
        </div>
      </section>
    )
  } else if (isError){
    content = <p>{JSON.stringify(error)}</p>
  }
  return content
}

export default UsersList
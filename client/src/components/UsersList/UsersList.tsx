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
          <h1 className={styleUserList.text_style_user}>Lista de Usuarios</h1>
        </div>
        <div className={styleUserList.text_user_list}>
          <div >
            <ul className={styleUserList.list_user}>
              {users.map((user: any, i: number) => {
                return <li key={i}>{user.name}</li>
              })}
            </ul>
          </div>
        </div>
        <div className={styleUserList.link_user_list}>
        <Link className={styleUserList.link_style_user_list} to='/welcome'>Back to Welcome</Link>
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
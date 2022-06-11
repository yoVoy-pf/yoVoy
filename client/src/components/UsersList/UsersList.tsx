import { useGetUsersQuery } from "../../slices/app/usersApiSlice";
import { Link } from "react-router-dom";

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
        <h1>Users List</h1>
        <ul>
          {users.map((user: any, i: number) => {
            return <li key={i}>{user.name}</li>
          })}
        </ul>
        <Link to='/welcome'>Back to Welcome</Link>
      </section>
    )
  } else if (isError){
    content = <p>{JSON.stringify(error)}</p>
  }
  return content
}

export default UsersList
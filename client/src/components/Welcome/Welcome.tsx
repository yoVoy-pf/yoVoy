import { useSelector } from "react-redux"
import { selectCurrentUser,selectCurrentToken } from "../../authentication/authSlice"
import { Link } from "react-router-dom"

export const Welcome = () => {
  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)

  const welcome = user ? `Welcome ${user}!`:`Welcome!`;

  const content = (
    <section>
      <h1>{welcome}</h1>
      <p>Token: {token}</p>
      <p><Link to='/userslist'>Go to the Users List</Link></p>
    </section>
  )
  return content
  
}

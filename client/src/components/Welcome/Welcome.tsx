import { useSelector } from "react-redux"
import { selectCurrentUser,selectCurrentToken } from "../../slices/authentication/authSlice"
import { Link } from "react-router-dom"


export const Welcome = () => {
  const user : any = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)
  console.log({user})

  const welcome = user ? `Welcome ${user.name}!`:`Welcome!`;

  const content = (
    <section>
      <h1>{welcome}</h1>
      <p>Token: {token}</p>
      <p><Link to='/userslist'>Go to the Users List</Link></p>
      <p><Link to='/create-category'>Crear Category</Link></p>
    </section>
  )
  return content
  
}

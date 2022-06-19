import { useSelector } from "react-redux"
import { selectCurrentUser,selectCurrentToken } from "../../slices/authentication/authSlice"
import { Link } from "react-router-dom"
import styleWelcome from './welcome.module.css'

export const Welcome = () => {
  const user : any = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)
  console.log({user})

  const welcome = user ? `Bienvenido ${user.name}!`:`Bienvenido!`;

  const content = (
    <section>
      <div className={styleWelcome.welcome_section}>
        <div className={styleWelcome.bienvenida_welcome}>
          <h1>{welcome}</h1>
        </div>
      </div>
        {/* <p>Token: {token}</p> */}
        {
          user.rolesId[2] &&
          <div className={styleWelcome.links_welcome}>
          <div className={styleWelcome.order_welcome}>
            <p><Link className={styleWelcome.links_style} to='/userslist'>Ir al panel de admin</Link></p>
            {/* <p><Link className={styleWelcome.links_style} to='/create-category'>Crear Categoría</Link></p> */}
          </div>
        </div>
        }
        
    </section>
  )
  return content
  
}

import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../../slices/authentication/authSlice";

interface Props{
  allowedRoles: number[];
}

const RequireAuth = ({allowedRoles}:Props) => {
  const token = useSelector(selectCurrentToken)
  const currentUser : any = useSelector(selectCurrentUser)
  const location = useLocation()

  return (
    token && currentUser?.rolesId?.find((role: number)=> allowedRoles?.includes(role))
    ? <Outlet/>
    : token
      ? <Navigate to="/unauthorized" state={{from: location}} replace />
      : <Navigate to="/login" state={{from: location}} replace />
  )
}

export default RequireAuth
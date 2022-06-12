import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../../slices/authentication/authSlice";
import Loading from '../Loading/Loading'
import { selectIsLoading } from "../../slices/uiSlice";


interface Props{
  allowedRoles: number[];
}

const RequireAuth = ({allowedRoles}:Props) => {
  const token = useSelector(selectCurrentToken)
  const currentUser: any = useSelector(selectCurrentUser)
  const location = useLocation()
  const loading : boolean = useSelector(selectIsLoading)

  if (loading) {
    return (
      <Loading/>
    )
  }

  return token && currentUser?.rolesId?.find((role: number) => allowedRoles?.includes(role))
    ? <Outlet />
    : token
      ? <Navigate to="/unauthorized" state={{from: location}} replace />
      : <Navigate to="/loading" state={{from: location}} replace />

  // return (
  //   token && currentUser?.rolesId?.find((role: number)=> allowedRoles?.includes(role))
  //   ? <Outlet/>
  //   : token
  //     ? <Navigate to="/unauthorized" state={{from: location}} replace />
  //     : <Navigate to="/login" state={{from: location}} replace />
  // )
}

export default RequireAuth
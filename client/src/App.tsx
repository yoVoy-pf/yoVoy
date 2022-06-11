import { Route, Routes } from 'react-router-dom';
import Event from './components/Event/Event';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Layout from './components/Layout/Layout';
import RequireAuth from './components/RequireAuth.ts/RequireAuth';
import { Welcome } from './components/Welcome/Welcome';
import UsersList from './components/UsersList/UsersList';
import {useGetUserAuthQuery} from './slices/authentication/authApiSlice'
import CreateCategory from './components/CreateCategory/CreateCategory';
import UpdateEvent from './components/UpdateEvent/UpdateEvent';
import Unauthorized from './components/Unauthorized/Unauthorized';
import ROLES_LIST from './slices/authentication/rolesList';


function App(): JSX.Element {
  useGetUserAuthQuery();

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path="events/:id" element={<Event />} />
        <Route path='unauthorized' element={<Unauthorized />} />
        {/* protected routes */}
        {/* <Route element={<RequireAuth allowedRoles={[ROLES_LIST.User]} />}>
          
        </Route> */}

        <Route element={<RequireAuth allowedRoles={[ROLES_LIST.User]}/>}>
          <Route path='welcome' element={<Welcome />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES_LIST.Organization]} />}>
          <Route path='update-event/:eventId' element={<UpdateEvent />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES_LIST.Admin]} />}>
          <Route path='userslist' element={<UsersList />} />
          <Route path='create-category' element={<CreateCategory/>} />
        </Route>
        {/* 404 */}
        <Route path='*' element={<Home/>}/>
      </Route>
    </Routes>
  )
}


export default App;

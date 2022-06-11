import { Route, Routes } from 'react-router-dom';
import Event from './components/Event/Event';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Layout from './components/Layout/Layout';
import RequireAuth from './components/RequireAuth.ts/RequireAuth';
import { Welcome } from './components/Welcome/Welcome';
import UsersList from './components/UsersList/UsersList';
import { useGetUserAuthQuery } from './authentication/authApiSlice'
import CreateCategory from './components/CreateCategory/CreateCategory';
import UpdateEvent from './components/UpdateEvent/UpdateEvent';


function App(): JSX.Element {
  useGetUserAuthQuery();

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route index element={<Home />} />
        <Route path="events/:id" element={<Event />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='update-event/:eventId' element={<UpdateEvent />} />
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path='welcome' element={<Welcome />} />
          <Route path='userslist' element={<UsersList />} />
          <Route path='create-category' element={<CreateCategory/>} />
        </Route>
      </Route>
    </Routes>
  )
}


export default App;

// import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Event from './components/Event/Event';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
// import NavBar from './components/NavBar/NavBar';
import Signup from './components/Signup/Signup';
import Layout from './components/Layout/Layout';
import RequireAuth from './components/RequireAuth.ts/RequireAuth';
import { Welcome } from './components/Welcome/Welcome';
import UsersList from './components/UsersList/UsersList';

function App(): JSX.Element {
	return (
			<Routes>
        <Route path='/' element={<Layout/>}>
          {/* public routes */}
          <Route index element={<Home />} />
          <Route path="events/:id" element={<Event />} />
          <Route path='login' element= {<Login/>}/>
          <Route path='signup' element={<Signup/>}/>
          {/* protected routes */}
          <Route element={<RequireAuth/>}>
            <Route path='welcome' element={<Welcome />}/>
            <Route path='userslist' element={<UsersList />}/>
          </Route>
        </Route>
			</Routes>
	);
}

export default App;

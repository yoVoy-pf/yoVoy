import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Event from './components/Event/Event';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';

function App(): JSX.Element {
	return (
		<div>
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/events/:id" element={<Event />} />
				<Route path='/signup' element={<Signup/>}/>
			</Routes>
		</div>
	);
}

export default App;

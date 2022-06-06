import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';

function App(): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;

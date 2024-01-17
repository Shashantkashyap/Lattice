
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import Details from './Components/Details';
import './App.css'; 

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/profile' element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;

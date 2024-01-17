import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login")
  };

  return (
    <div className="navbar-container flex justify-between">
      <div className="logo-container ">
        <h2 className='text-4xl font-bold'>Welcome Back</h2>
      </div>

      <div className="button-container">
        {localStorage.getItem("token") === null ? (
          <div className='flex items-center'>
            <Link to="/login" className="nav-link p-2 bg-green-400 text-xl shadow-md rounded-md hover:bg-green-600">
              <button >Login</button>
            </Link>

            

            
          </div>
        ) : (
          <div className='flex' >
            <Link to="/registration" className="nav-link p-2 bg-green-400 text-xl shadow-md rounded-md hover:bg-green-600">
              <button onClick={handleLogout} >Patient Registration</button>
            </Link>

            <Link to="/profile" className="nav-link p-2 bg-green-400 text-xl shadow-md rounded-md hover:bg-green-600">
              <button>View Profile</button>
            </Link>

            <div className="nav-link p-2 bg-red-400 text-xl shadow-md rounded-md hover:bg-red-600">
              <button className="signup-button " onClick={handleLogout}>Logout</button>
            </div>

           
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
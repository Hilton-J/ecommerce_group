import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('_id');

  useEffect(() => {
    
    if (userId) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userId]);

  const handleLogout = () => {
  
    localStorage.removeItem('_id');
    localStorage.removeItem('role');
       
     
    setIsLoggedIn(false);
    navigate('/'); 
  };

  return (
    <div className='flex justify-between items-center px-6 py-6 bg-white shadow-lg rounded-lg border border-gray-300'>
      <Link to='/' className='bg-blue-600 p-4 rounded-lg shadow-md'>
        <h1 className='text-3xl font-semibold text-white'>Local Market</h1>
      </Link>

      <div className='flex gap-2 items-center space-x-4 md:space-x-8'>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className='bg-red-500 hover:bg-red-600 transition duration-300 text-white py-2 px-6 rounded-lg shadow-md cursor-pointer'
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to='/login'
              className='bg-green-500 hover:bg-green-600 transition duration-300 text-white py-2 px-6 rounded-lg shadow-md cursor-pointer'
            >
              Log In
            </Link>
            <Link
              to='/register'
              className='bg-blue-500 hover:bg-blue-600 transition duration-300 text-white py-2 px-6 rounded-lg shadow-md cursor-pointer'
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

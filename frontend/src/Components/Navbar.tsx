import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex justify-between items-center px-6 py-6 bg-white shadow-lg rounded-lg border border-gray-300'>
      <Link to='/' className='bg-blue-600 p-4 rounded-lg shadow-md'>
        <h1 className='text-3xl font-semibold text-white'>Local Market</h1>
      </Link>

      <div className='flex gap-8 items-center space-x-4 md:space-x-8'>
        <Link to={'Login'} className='bg-green-500 hover:bg-green-600 transition duration-300 text-white py-2 px-6 rounded-lg shadow-md cursor-pointer'>
          Log In
        </Link>
        <Link to={'Register'} className='bg-blue-500 hover:bg-blue-600 transition duration-300 text-white py-2 px-6 rounded-lg shadow-md cursor-pointer'>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

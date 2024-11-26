import React from 'react';
import searchIcon from '../assets/wew.png';
import like from '../assets/like.png';
import notlike from '../assets/notlike.png';
import Car from '../assets/product.jpg';
import headphone  from '../assets/headphone.jpg';
import Steak  from '../assets/steak.jpg';
import { Link } from 'react-router-dom';


const MainPage = () => {
    
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-start py-10">
      <div className="max-w-screen-xl w-full flex justify-between  gap-10">
       
        <div className="w-1/4 bg-white rounded-lg shadow-lg p-6">

          <div className="flex items-center space-x-4 mb-8">
            <img src={searchIcon} alt="search" className="h-12 w-12" />
            <p className="text-lg font-semibold text-gray-800">Search on Marketplace</p>
          </div>


          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Categories</h2>
       
            <div className="flex flex-col space-y-2 ">
                        <div 
                className="text-md text-gray-600 cursor-pointer hover:text-blue-500" 
                
              >
                Cars
              </div>
              <div 
                className="text-md text-gray-600 cursor-pointer  hover:text-blue-500" 
                
              >
                Electronics
              </div>
              <div 
                className="text-md text-gray-600 cursor-pointer  hover:text-blue-500" 
               
              >
                Entertainment
              </div>
              <div 
                className="text-md text-gray-600 cursor-pointer  hover:text-blue-500" 
            
              >
                Rent
              </div>
              </div>
          </div>
        </div>

   
        <div className="w-3/4 flex flex-wrap gap-8">
          <div className="w-72 bg-white rounded-lg shadow-md overflow-hidden">
            <img src={Car} alt="Car" className="w-full h-52 object-cover" />
            
            <div className="p-4 flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-800">R 45 000.99</p>
              <img src={like} alt="like" className="h-7 w-7 cursor-pointer" />
            </div>
            
            <div className="px-4 pb-4">
              <p className="text-sm text-gray-600">
                Beautiful convertible car <br />
                TF 1.8i 16v Model 02 <br />
                2-door, Mileage 175000km <br />
                Everyday runner, Engine gearbox 💯 <br />
                Full service history book as well
              </p>
            </div>

            <div className="px-4 py-2 bg-gray-50 flex justify-self-end">
              <p className="text-sm text-gray-500">Johannesburg, Gauteng</p>
            </div>
          </div>
          <div className="w-72 bg-white rounded-lg shadow-md overflow-hidden">
            <img src={headphone} alt="Car" className="w-full h-52 object-cover" />
            
            <div className="p-4 flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-800">R 305.99</p>
              <img src={like} alt="like" className="h-7 w-7 cursor-pointer" />
            </div>
            
            <div className="px-4 pb-4">
              <p className="text-sm text-gray-600">
                Best steack in town <br />
                Fried<br />
                2-door, Mileage 175000km <br />
                EFryied <br />
                
              </p>
            </div>

            <div className="px-4 py-2 bg-gray-50 flex justify-self-end">
              <p className="text-sm text-gray-500">Johannesburg, Gauteng</p>
            </div>
          </div>
          <div className="w-72 bg-white rounded-lg shadow-md overflow-hidden">
            <img src={Steak} alt="Car" className="w-full h-52 object-cover" />
            
            <div className="p-4 flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-800">R 60.99</p>
              <img src={like} alt="like" className="h-7 w-7 cursor-pointer" />
            </div>
            
            <div className="px-4 pb-4">
              <p className="text-sm text-gray-600">
                Best steack in town <br />
                Fried<br />
                2-door, Mileage 175000km <br />
                EFryied <br />
                
              </p>
            </div>

            <div className="px-4 py-2 bg-gray-50 flex justify-self-end">
              <p className="text-sm text-gray-500">Johannesburg, Gauteng</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    
  );
};

export default MainPage;

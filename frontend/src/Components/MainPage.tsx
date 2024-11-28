// import searchIcon from '../assets/wew.png';
import like from "../assets/like.png";
import notlike from "../assets/notlike.png";
import Car from "../assets/product.jpg";
import headphone from "../assets/headphone.jpg";
import Steak from "../assets/steak.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";

const MainPage = () => {
  const [carLiked, setCarLiked] = useState(true);
  const [headphoneLiked, setHeadphoneLiked] = useState(true);
  const [steakLiked, setSteakLiked] = useState(true);

  const handleLikeToggle = (product: string) => {
    if (product === "car") {
      setCarLiked(!carLiked);
    } else if (product === "headphone") {
      setHeadphoneLiked(!headphoneLiked);
    } else if (product === "steak") {
      setSteakLiked(!steakLiked);
    }
  };

  return (
    <div className='bg-gray-50 min-h-screen flex justify-center items-start py-10'>
      <div className='max-w-screen-xl w-full flex flex-col lg:flex-row justify-between gap-10'>
        <div className='w-full lg:w-1/4 bg-white rounded-lg shadow-lg p-6 space-y-6'>
          <h2 className='text-2xl font-semibold text-gray-800'>Categories</h2>
          <div className='space-y-4'>
            <div className='category-item'>
              <div className='text-lg font-medium text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-300 hover:pl-2'>
                Cars
              </div>
            </div>
            <div className='category-item'>
              <div className='text-lg font-medium text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-300 hover:pl-2'>
                Electronics
              </div>
            </div>
            <div className='category-item'>
              <div className='text-lg font-medium text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-300 hover:pl-2'>
                Entertainment
              </div>
            </div>
            <div className='category-item'>
              <div className='text-lg font-medium text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-300 hover:pl-2'>
                Rent
              </div>
            </div>
            <div className='category-item'>
              <div className='text-lg font-medium text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-300 hover:pl-2'>
                Food
              </div>
            </div>
            <div className='category-item'>
              <div className='text-lg font-medium text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-300 hover:pl-2'>
                Sports
              </div>
            </div>
            <div className='category-item'>
              <div className='text-lg font-medium text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-300 hover:pl-2'>
                Accessories
              </div>
            </div>
            <div className='category-item'>
              <div className='text-lg font-medium text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-300 hover:pl-2'>
                Home
              </div>
            </div>
          </div>
        </div>

        <div className='w-full lg:w-3/4 flex flex-wrap gap-8 justify-center'>
          <div className='w-full sm:w-72 md:w-80 lg:w-72 bg-white rounded-lg shadow-md overflow-hidden'>
            <Link to='/Description'>
              <img src={Car} alt='Car' className='w-full h-52 object-cover' />
            </Link>
            <div className='p-4 flex justify-between items-center'>
              <p className='text-lg font-semibold text-gray-800'>R 45 000.99</p>
              <img
                src={carLiked ? notlike : like}
                alt='like'
                className='h-7 w-7 cursor-pointer'
                onClick={() => handleLikeToggle("car")}
              />
            </div>
            <div className='px-4 pb-4'>
              <p className='text-sm text-gray-600'>
                Beautiful convertible car <br />
                TF 1.8i 16v Model 02 <br />
                2-door, Mileage 175000km <br />
                Everyday runner, Engine gearbox 💯 <br />
                Full service history book as well
              </p>
            </div>
            <div className='px-4 py-2 bg-gray-50'>
              <p className='text-sm text-gray-500'>Johannesburg, Gauteng</p>
            </div>
          </div>

          <div className='w-full sm:w-72 md:w-80 lg:w-72 bg-white rounded-lg shadow-md overflow-hidden'>
            <Link to='/Description'>
              <img
                src={headphone}
                alt='Headphone'
                className='w-full h-52 object-cover'
              />
            </Link>
            <div className='p-4 flex justify-between items-center'>
              <p className='text-lg font-semibold text-gray-800'>R 305.99</p>
              <img
                src={headphoneLiked ? notlike : like}
                alt='like'
                className='h-7 w-7 cursor-pointer'
                onClick={() => handleLikeToggle("headphone")}
              />
            </div>
            <div className='px-4 pb-4'>
              <p className='text-sm text-gray-600'>
                Best headphones for sound clarity <br />
                Noise-canceling feature <br />
                Comfortable fit <br />
                Great for long listening sessions
              </p>
            </div>
            <div className='px-4 py-2 bg-gray-50'>
              <p className='text-sm text-gray-500'>Johannesburg, Gauteng</p>
            </div>
          </div>

          <div className='w-full sm:w-72 md:w-80 lg:w-72 bg-white rounded-lg shadow-md overflow-hidden'>
            <Link to='/Description'>
              <img
                src={Steak}
                alt='Steak'
                className='w-full h-52 object-cover'
              />
            </Link>
            <div className='p-4 flex justify-between items-center'>
              <p className='text-lg font-semibold text-gray-800'>R 60.99</p>
              <img
                src={steakLiked ? notlike : like}
                alt='like'
                className='h-7 w-7 cursor-pointer'
                onClick={() => handleLikeToggle("steak")}
              />
            </div>
            <div className='px-4 pb-4'>
              <p className='text-sm text-gray-600'>
                Best steak in town <br />
                Fried to perfection <br />
                Tender and juicy <br />
                Comes with a side of fries
              </p>
            </div>
            <div className='px-4 py-2 bg-gray-50'>
              <p className='text-sm text-gray-500'>Johannesburg, Gauteng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

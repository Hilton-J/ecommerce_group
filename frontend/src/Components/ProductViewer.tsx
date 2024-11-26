import React from 'react';
import headphone from '../assets/headphone.jpg';

const ProductViewer = () => {
  return (
    <div className='flex justify-center px-10 py-16 bg-gray-50'>
      <div className='max-w-4xl flex gap-8'>
        
       
        <div className='flex-1'>
          <img src={headphone} alt="Headphones" className='w-full h-auto rounded-lg shadow-lg' />
        </div>

        
        <div className='flex-1'>
          <div className='space-y-6'>
            
       
            <div>
              <h1 className='text-3xl font-bold text-gray-800'>Amp Headphones</h1>
              <p className='text-lg text-gray-600 mt-2'>
                These headphones deliver crystal-clear sound and deep bass for an immersive listening experience.
              </p>
              <p className='text-sm text-gray-500 mt-2'>
                Super comfortable with premium materials for long-lasting wear.
              </p>
            </div>

          
            <div className='flex justify-between items-center'>
              <p className='text-xl font-semibold text-gray-800'>R240.99</p>
              <div className='text-sm text-gray-500'>
                <p className='flex items-center'>
                  <span className='mr-1'>4.7</span>
                  <span>⭐</span>
                </p>
                <p>Ratings</p>
              </div>
            </div>

        
            <div className='space-y-4 mt-10'>
              <h2 className='text-xl font-semibold text-gray-800'>Seller Details</h2>
              <div className='text-gray-600'>
                <p className='text-sm'>Jose Maktpee</p>
                <p className='text-sm'>Lenasia, Ext 10</p>
                <p className='text-sm'>Soooe Retail Store Car Dealer</p>
                <p className='text-sm font-medium text-green-500'>Approved Seller</p>
              </div>
            </div>

        
            <div className='space-y-4 mt-6'>
              <h3 className='text-lg font-semibold text-gray-800'>Contact Seller</h3>
              <div className='text-gray-600'>
                <p className='text-sm'>
                  <a href="mailto:jose.maktpee@example.com" className='text-blue-500 hover:underline'>
                    Email: jose.maktpee@example.com
                  </a>
                </p>
                <p className='text-sm'>
                  <a href="tel:+1234567890" className='text-blue-500 hover:underline'>
                    Call: +1 (234) 567-890
                  </a>
                </p>
              </div>
            </div>

            <div className='mt-8'>
              <h3 className='text-lg font-semibold text-gray-800'>Location</h3>
              <p className='text-sm text-gray-600'>View on Google Map</p>
              <div className='bg-gray-200 w-full h-48 rounded-lg mt-2'>
                {/* Insert a map here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewer;

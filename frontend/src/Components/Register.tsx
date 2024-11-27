import React, { useState } from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [Fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [userType, setUserType] = useState<'buyer' | 'seller'>('buyer');
  const [companyName, setCompanyName] = useState('');
  const [companyRegNumber, setCompanyRegNumber] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    province: '',
    zip: '',
  });
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Basic validations
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (userType === 'seller' && (!companyName || !companyRegNumber || !address.street || !address.city || !address.province || !address.zip)) {
      setError('Please fill in all seller fields.');
      return;
    }

    const userData = { name: Fullname, email: emailOrPhone, password: password, role: userType };
    const sellerData = { name: Fullname, email: emailOrPhone, companyName: companyName, companyRegistration: companyRegNumber, address: address, password: password, role: userType };
    
    try {
      const response = await fetch('http://localhost:9000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userType === 'buyer' ? userData : sellerData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.name || 'Registration successful');
         navigate('/login');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddressSubmit = (newAddress:any) => {
    setAddress(newAddress); 
    closeModal(); 
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        {error && (
          <div className="bg-red-500 text-white p-2 mb-4 text-center rounded">
            {error}
          </div>
        )}

        {userType === 'buyer' && (
          <div className="mt-6 space-y-4">
            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition duration-300"
            >
              <FaGoogle className="mr-2" /> Login with Google
            </button>
            <button
              onClick={handleFacebookLogin}
              className="w-full py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition duration-300"
            >
              <FaFacebook className="mr-2" /> Login with Facebook
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="userType" className="block text-sm text-gray-600">Register as</label>
            <select
              id="userType"
              value={userType} 
              onChange={(e) => setUserType(e.target.value as 'buyer' | 'seller')} 
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="buyer">Customer</option> 
              <option value="seller">Seller</option> 
            </select>
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={Fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="emailOrPhone" className="block text-sm text-gray-600">Email or Phone</label>
            <input
              type="text"
              id="emailOrPhone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your email or phone"
            />
          </div>

          {userType === 'seller' && (
            <>
              <div>
                <label htmlFor="companyName" className="block text-sm text-gray-600">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your company name"
                />
              </div>

              <div>
                <label htmlFor="companyRegNumber" className="block text-sm text-gray-600">Company Registration Number</label>
                <input
                  type="text"
                  id="companyRegNumber"
                  value={companyRegNumber}
                  onChange={(e) => setCompanyRegNumber(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your company registration number"
                />
              </div>

             
              <div className="mt-4">
                <button
                  type="button"
                  onClick={openModal}
                  className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Add Address
                </button>
              </div>
            </>
          )}

          <div>
            <label htmlFor="password" className="block text-sm text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm text-gray-600">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Confirm your password"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Register
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">Log in</a>
          </p>
        </div>
      </div>

      <ToastContainer />
      
   
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Enter Your Address</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleAddressSubmit(address); }}>
              <div className="mb-4">
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={address.street}
                  onChange={(e) => setAddress({...address, street: e.target.value})}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your street address"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={address.city}
                  onChange={(e) => setAddress({...address, city: e.target.value})}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your city"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="province" className="block text-sm font-medium text-gray-700">Province</label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  value={address.province}
                  onChange={(e) => setAddress({...address, province: e.target.value})}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your province"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Zip Code</label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={address.zip}
                  onChange={(e) => setAddress({...address, zip: e.target.value})}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your zip code"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;

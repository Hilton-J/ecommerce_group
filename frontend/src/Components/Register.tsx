import React, { useState } from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa'; 

const Register = () => {

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [userType, setUserType] = useState<'customer' | 'seller'>('customer'); 
  const [companyName, setCompanyName] = useState('');
  const [companyRegNumber, setCompanyRegNumber] = useState('');
  const [ownerFullName, setOwnerFullName] = useState('');
  const [address, setAddress] = useState('');


  const handleGoogleLogin = () => {
    console.log('Google login clicked');
   
  };


  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

 
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }


    if (userType === 'seller' && (!companyName || !companyRegNumber || !ownerFullName || !address)) {
      setError('Please fill in all seller fields.');
      return;
    }


    console.log('Form submitted', { emailOrPhone, password, userType, companyName, companyRegNumber, ownerFullName, address });
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

      
        {userType === 'customer' && (
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
              onChange={(e) => setUserType(e.target.value as 'customer' | 'seller')}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your full name"
            />
          </div>

       
          <div>
            <label htmlFor="emailOrPhone" className="block text-sm text-gray-600">Email or Phone Number</label>
            <input
              type="text"
              id="emailOrPhone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your email or phone number"
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

              <div>
                <label htmlFor="ownerFullName" className="block text-sm text-gray-600">Owner's Full Name</label>
                <input
                  type="text"
                  id="ownerFullName"
                  value={ownerFullName}
                  onChange={(e) => setOwnerFullName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter the owner's full name"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm text-gray-600">Address</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your address"
                />
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
    </div>
  );
};

export default Register;

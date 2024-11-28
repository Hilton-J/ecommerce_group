import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login: React.FC = () => {
  const [emailOrPhone, setEmailOrPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailOrPhone || !password) {
      setError('Please fill in both fields.');
      return;
    }

    const userData = { email: emailOrPhone, password: password };

    try {
      const response = await fetch('http://localhost:9000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies (JWT token)
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.data.token);

        // Store JWT token in localStorage
        localStorage.setItem('token', data.data.token); // Save JWT token
        localStorage.setItem('_id', data.data._id);
        localStorage.setItem('role', data.data.role);
        localStorage.setItem('UserData', JSON.stringify(data.data)); // Store other user data

        toast.success('Login successful');
        navigate('/'); // Redirect to homepage
        setError('');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Login failed. Please try again.');
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An unexpected error occurred. Please try again.');
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Log In</h2>

        {error && (
          <div className="bg-red-500 text-white p-2 mb-4 text-center rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="emailOrPhone" className="block text-sm text-gray-600">
              Email or Phone
            </label>
            <input
              type="text"
              id="emailOrPhone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your email or phone"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-end mt-2">
            <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Log In
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default Login;

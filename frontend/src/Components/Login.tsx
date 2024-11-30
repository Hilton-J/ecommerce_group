import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch, RootState } from "../store";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast, ToastContainer } from "react-toastify";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success(`Logged in Successfully`);
      navigate("/");
    } catch (err) {
      console.log("Error: ", err);
      if (err && typeof err === "object" && "data" in err) {
        toast.error((err as { data: { message: string } }).data.message);
      } else {
        toast.error(`An unexpected error occurred: ${err}`);
      }
    }
  };

  return (
    <>
      <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='bg-white p-8 rounded-lg shadow-lg w-full sm:w-96'>
          <h2 className='text-2xl font-semibold text-center mb-6'>Log In</h2>

          {/* {error && (
          <div className='bg-red-500 text-white p-2 mb-4 text-center rounded'>
            {error}
          </div>
        )} */}

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label htmlFor='email' className='block text-sm text-gray-600'>
                Email or Phone
              </label>
              <input
                type='text'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg'
                placeholder='Enter your email'
              />
            </div>

            <div>
              <label htmlFor='password' className='block text-sm text-gray-600'>
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg'
                placeholder='Enter your password'
              />
            </div>

            <div className='flex justify-between mt-2'>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='showPassword'
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label htmlFor='showPassword' className='text-sm'>
                  Show Password
                </label>
              </div>
              <a
                href='/forgot-password'
                className='text-sm text-blue-500 hover:underline'
              >
                Forgot password?
              </a>
            </div>
            {isLoading}
            <div className='mt-6'>
              <button
                type='submit'
                className='w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300'
              >
                Log In
              </button>
            </div>
          </form>

          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-500'>
              Don't have an account?{" "}
              <a href='/register' className='text-blue-500 hover:underline'>
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;

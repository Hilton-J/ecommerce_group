import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProductForm from "./AddProductForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";

const Navbar = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate();
  // const userId = localStorage.getItem("_id");
  // const [menuOpen, setMenuOpen] = useState(false);

  // const toggleMenu = () => {
  //   setMenuOpen(!menuOpen);
  //   if (!menuOpen) {
  //     setTimeout(() => {
  //       setMenuOpen(false);
  //     }, 1000000);
  //   }
  // };
  // useEffect(() => {
  //   if (userId) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [userId]);

  // const handleLogout = async () => {
  //   try {
  //     const response = await fetch("http://localhost:9000/api/users/logout", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       toast.success(data.message);
  //       localStorage.removeItem("_id");
  //       localStorage.removeItem("role");

  //       setIsLoggedIn(false);

  //       navigate("/");
  //     } else {
  //       const errorData = await response.json();
  //       toast.error(errorData.message || "Logout failed. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //     toast.error("An unexpected error occurred. Please try again.");
  //   }
  // };
  // localStorage.getItem("role"); //seller or admin

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall({}).unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='flex justify-between items-center px-6 py-6 bg-white shadow-lg rounded-lg border border-gray-300 w-full col-span-full'>
      <Link
        to='/'
        className='bg-blue-600 p-4 rounded-lg shadow-md  md:w-52 text-center'
      >
        <h1 className=' lg:text-xl font-semibold text-white'>Local Market</h1>
      </Link>
      {/* <button
        className='text-blue-500 text-3xl lg:hidden focus:outline-none'
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-controls='nav-menu'
      >
        &#9776;
      </button> */}
      <div className={`flex gap-2 items-center space-x-4 md:space-x-8 `}>
        {userInfo ? (
          <div className='flex  flex-col gap-10 md:flex-row w-full text-black'>
            {(userInfo.role === "seller" || userInfo.role === "admin") && (
              <AddProductForm />
            )}

            <button
              onClick={logoutHandler}
              className='bg-red-500 hover:bg-red-600 transition duration-300 text-white py-2 px-6 rounded-lg shadow-md cursor-pointer'
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <div className='flex  flex-col gap-2 md:flex-row'>
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

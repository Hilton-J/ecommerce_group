import { Sidebar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
const SideBar = () => {
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
    <div className='h-screen col-start-1 col-end-3'>
      <Sidebar aria-label='Default sidebar' className='w-full'>
        <Sidebar.Items className='border-2 border-blue-500 h-full'>
          <Sidebar.ItemGroup className=''>
            <Sidebar.Item
              href='#'
              className='hover:bg-blue-600 hover:text-white'
            >
              Dashboard
            </Sidebar.Item>
            {userInfo && userInfo.role === "admin" && (
              <Sidebar.Item
                href='#'
                className='hover:bg-blue-600 hover:text-white'
              >
                Users
              </Sidebar.Item>
            )}
            <Sidebar.Item
              href='#'
              className='hover:bg-blue-600 hover:text-white'
            >
              Products
            </Sidebar.Item>

            {userInfo ? (
              <Sidebar.Item
                href='/login'
                className='hover:bg-blue-600 hover:text-white'
                onClick={logoutHandler}
              >
                Logout
              </Sidebar.Item>
            ) : (
              <>
                <Sidebar.Item
                  href='/login'
                  className='hover:bg-blue-600 hover:text-white'
                >
                  Sign In
                </Sidebar.Item>
                <Sidebar.Item
                  href='/register'
                  className='hover:bg-blue-600 hover:text-white'
                >
                  Sign Up
                </Sidebar.Item>
              </>
            )}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default SideBar;

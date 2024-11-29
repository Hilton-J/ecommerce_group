import { Sidebar } from "flowbite-react";
const SideBar = () => {
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
            <Sidebar.Item
              href='#'
              className='hover:bg-blue-600 hover:text-white'
            >
              Users
            </Sidebar.Item>
            <Sidebar.Item
              href='#'
              className='hover:bg-blue-600 hover:text-white'
            >
              Products
            </Sidebar.Item>
            <Sidebar.Item
              href='#'
              className='hover:bg-blue-600 hover:text-white'
            >
              Sign In
            </Sidebar.Item>
            <Sidebar.Item
              href='#'
              className='hover:bg-blue-600 hover:text-white'
            >
              Sign Up
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default SideBar;

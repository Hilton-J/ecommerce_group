import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { ToastContainer } from "react-toastify";
import Footer from "../Components/Footer";
import SideBar from "../Components/SideBar";

const MainLayout = () => {

  
  return (
    <section className='grid grid-cols-16'>
      <Navbar />
      <SideBar />
      <main className='min-h-screen col-start-3 col-span-full'>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </section>
  );
};

export default MainLayout;

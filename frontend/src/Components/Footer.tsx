const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className='flex bg-black items-center justify-center py-9 w-full col-span-full '>
      <footer className=' p-4 text-center'>
        <p className='text-gray-200'>
          &copy; {year} Lwandile,Lucy and Duncan. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import like from "../assets/like.png";
import notlike from "../assets/notlike.png";
import { useGetProductBySellerQuery } from "../slices/productApiSlice";

const MainPage: React.FC = () => {
  // State to manage likes for each product
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [users, setUsers] = useState<User[]>([]);

  const { data: products, isLoading } = useGetProductBySellerQuery({
    page: currentPage,
  });

  // Function to handle the like toggle for a product
  const handleLikeToggle = (productId: string) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [productId]: !prevLikes[productId], // Toggle the like state for the specific product
    }));
  };

  // TODO: Implement pagination
  // Function to handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  handlePageChange(1);

  return (
    <div className='bg-gray-50 min-h-screen flex justify-center items-start py-10'>
      {isLoading && <p>Loading...</p>}
      <div className='max-w-screen-xl w-full flex flex-col lg:flex-row justify-between gap-10'>
        {/* Categories Sidebar */}
        <div className='w-full lg:w-1/4 bg-white rounded-lg shadow-lg p-6 space-y-6'>
          <h2 className='text-2xl font-semibold text-gray-800'>Categories</h2>
          <div className='space-y-4'>
            {/* Categories list */}
            {[
              "Cars",
              "Electronics",
              "Entertainment",
              "Rent",
              "Food",
              "Sports",
              "Accessories",
              "Home",
            ].map((category) => (
              <div key={category} className='category-item'>
                <div className='text-lg font-medium text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-300 hover:pl-2'>
                  {category}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products Display */}
        <div className='w-full lg:w-3/4 flex flex-wrap gap-8 justify-center'>
          {products && products.products.length === 0 ? (
            <p className='text-lg font-semibold text-gray-800'>
              No products available
            </p>
          ) : (
            products &&
            products.products.map((p) => (
              <div
                key={p._id}
                className='w-full sm:w-72 md:w-80 lg:w-72 bg-white rounded-lg shadow-md overflow-hidden'
              >
                <Link to='/Description'>
                  <img
                    src={String(p.image || null)}
                    alt='Product'
                    className='w-full h-52 object-cover'
                  />
                </Link>
                <div className='p-4 flex justify-between items-center'>
                  <p className='text-lg font-semibold text-gray-800'>
                    R {p.price}
                  </p>
                  <img
                    src={likes[p._id] ? like : notlike}
                    alt='like'
                    className='h-7 w-7 cursor-pointer'
                    onClick={() => handleLikeToggle(p._id)} // Pass product ID to toggle the like state
                  />
                </div>
                <div className='px-4 pb-4'>
                  <p className='text-sm text-gray-600'>{p.description} 💯</p>
                </div>
                <div className='px-4 py-2 bg-gray-100'>
                  {/* Check if users is defined before mapping */}
                  {/* {users?.map((user) => {
                    if (p.seller === user._id) {
                      return (
                        <div key={user._id} className='text-sm text-gray-500'>
                          <p>
                            <strong>Address:</strong>
                          </p>
                          <p>
                            {user?.address?.street}, {user?.address?.city},{" "}
                            {user?.address?.province}, {user?.address?.zip}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  })} */}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import like from '../assets/like.png';
import notlike from '../assets/notlike.png';

interface Product {
  _id: string;
  image: string;
  price: number;
  description: string;
  seller: string; 
  category: string; 
}

interface Address {
  city: string;
  province: string;
  street: string;
  zip: string;
  _id: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  address?: Address;
  companyName: string;
  companyRegistration: string;
  role: string;
}

const MainPage: React.FC = () => {
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleLikeToggle = (productId: string) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [productId]: !prevLikes[productId], // Toggle the like state for the specific product
    }));
  };

  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/products/');
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/users/');
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getProducts();
    getUsers();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="bg-gradient-to-r  min-h-screen py-10">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between gap-8 p-4">
        {/* Categories Sidebar */}
        <div className="w-full  bg-white rounded-lg shadow-lg p-6 space-y-6 h-full">
          <h2 className="text-3xl font-bold text-gray-800">Categories</h2>
          <div className=" flex flex-wrap md:flex-col gap-1 ">
  {['Cars', 'Electronics', 'Entertainment', 'Rent', 'Food', 'Sports', 'Accessories', 'Home'].map((category) => (
    <div
      key={category}
      className={`category-item p-4 rounded-md cursor-pointer ${selectedCategory === category ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-indigo-100'} transition duration-300 flex-1  md:flex-0`}
      onClick={() => setSelectedCategory(category)}
    >
      <p className="md:text-lg font-medium">{category}</p>
    </div>
  ))}

  {selectedCategory && (
    <div
      className="text-lg font-medium text-red-500 cursor-pointer hover:text-red-600 mt-4"
      onClick={() => setSelectedCategory('')}
    >
      Clear Filter
    </div>
  )}
</div>

        </div>

        {/* Products Display */}
        <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts?.length === 0 ? (
            <p className="text-lg font-semibold text-gray-800">No products available</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                <Link to={`Description/${product._id}`}>
                  <img src={product.image} alt="Product" className="w-full h-52 object-cover rounded-t-lg" />
                </Link>
                <div className="p-4 flex justify-between items-center">
                  <p className="text-xl font-semibold text-indigo-600">R {product.price}</p>
                  <img
                    src={likes[product._id] ? like : notlike}
                    alt="like"
                    className="h-8 w-8 cursor-pointer transition-all duration-300 hover:scale-110"
                    onClick={() => handleLikeToggle(product._id)}
                  />
                </div>
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-600">{product.description} 💯</p>
                </div>
                <div className="px-4 py-2 bg-gray-100 rounded-b-lg">
                  {users?.map((user) => {
                    if (product.seller === user._id) {
                      return (
                        <div key={user._id} className="text-sm text-gray-500">
                          <p><strong>Address:</strong></p>
                          <p>{user.address?.street}, {user.address?.city}, {user.address?.province}, {user.address?.zip}</p>
                        </div>
                      );
                    }
                    return null;
                  })}
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

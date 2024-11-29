import React, { useState, useEffect } from 'react';
import headphone from '../assets/headphone.jpg'; // Assuming this is a fallback image
import { useParams } from 'react-router-dom';

// Define types for product and user data
interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  seller: string; 
  stock: number;
  rating: number;
  category: string;
}

interface Address {
  city: string;
  province: string;
  street: string;
  zip: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  address: Address;
  companyName: string;
  companyRegistration: string;
  role: string;
}

const ProductViewer = () => {
  const [product, setProduct] = useState<Product | undefined>(undefined); // Default state is undefined
  const [user, setUser] = useState<User | undefined>(undefined);
  const { id } = useParams(); // Get product ID from the URL

  // Fetch products from the API
  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/products/');
      const data = await response.json();
      console.log(data.products); // You can inspect the full response here

      // Find the product by ID
      const foundProduct = data.products.find((p: Product) => p._id === id);
      setProduct(foundProduct); // Set product state
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Fetch users from the API
  const getUsers = async () => {
    if (product) {
      try {
        const response = await fetch('http://localhost:9000/api/users/');
        const data = await response.json();
        
        // Find the user based on the seller ID of the product
        const foundUser = data.users.find((u: User) => u._id === product.seller);
        setUser(foundUser); // Set user state
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
  };

  // Fetch product and user data when the component mounts
  useEffect(() => {
    getProducts(); // First, fetch product data
  }, [id]); // Re-fetch product if the ID changes

  // Use another effect to fetch user details after product is fetched
  useEffect(() => {
    if (product) {
      getUsers(); 
    }
  }, [product]); 

  if (!product || !user) {
    return <div className="flex justify-center px-10 py-16 bg-gray-50">Loading...</div>; // Loading state
  }

  return (
    <div className="flex justify-center px-10 py-16 bg-gradient-to-r min-h-screen">
      <div className="max-w-6xl flex flex-col md:flex-row gap-8 bg-white shadow-lg rounded-lg p-6">
        {/* Product Image Section */}
        <div className="flex-1">
          <img
            src={product.image || headphone} 
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Details Section */}
        <div className="flex-1">
          <div className="space-y-6">
            {/* Product Name and Description */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
              <p className="text-lg text-gray-600 mt-2">{product.description}</p>
              <p className="text-sm text-gray-500 mt-2">Stock Left: {product.stock}</p>
            </div>

            {/* Price and Rating */}
            <div className="flex justify-between items-center">
              <p className="text-2xl font-semibold text-blue-600">R {product.price}</p>
              <div className="text-sm text-gray-500">
                <p className="flex items-center">
                  <span className="mr-1">5</span>
                  <span>⭐</span>
                </p>
                <p>Ratings</p>
              </div>
            </div>

            {/* Seller Details */}
            <div className="space-y-4 mt-10 border-t pt-4">
              <h2 className="text-xl font-semibold text-gray-800">Seller Details</h2>
              <div className="text-gray-600">
                <p className="text-sm">{user.companyName}</p>
                <p className="text-sm">Company Reg No.: {user.companyRegistration}</p>
                <p className="text-sm">
                  {user.address.street}, {user.address.city}, {user.address.province}, {user.address.zip}
                </p>
                <p className="text-sm">{user.name}</p>
                <p className="text-sm font-medium text-green-500">Approved Seller</p>
              </div>
            </div>

            {/* Contact Seller */}
            <div className="space-y-4 mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-800">Contact Seller</h3>
              <div className="text-gray-600">
                <p className="text-sm">
                  <a href={`mailto:${user.email}`} className="text-blue-500 hover:underline">
                    Email: {user.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="mt-8 border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-800">Location</h3>
              <p className="text-sm text-gray-600">View on Google Map</p>
              <div className="bg-gray-200 w-full h-48 rounded-lg mt-2">
                {/* Google map can be embedded here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewer;

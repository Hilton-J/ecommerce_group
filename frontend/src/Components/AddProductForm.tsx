import React, { useState } from 'react';

interface FormData {
  name: string;
  price: number;  // Change price type to number
  category: string;
  description: string;
  stock: number;
  image: File | null;  // Change image type to File
}

const AddProductForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    price: 0,
    category: '',
    description: '',
    stock: 0,
    image: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'price' ? parseFloat(value) : value, // Parse price as number
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 
    setFormData((prevState) => ({
      ...prevState,
      image: file ?? null,  // Update image to the file object, not a data URL
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const productData = {
      name: formData.name,
      description: formData.description,
      price: formData.price.toString(),
      stock: formData.stock.toString(),
      category: formData.category,
      image: formData.image,
      seller: localStorage.getItem('_id'),
    };
  
    alert(productData.name);
    
    try {
      const response = await fetch('http://localhost:9000/api/products/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('role')}`,  
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData), 
      });
  
      if (!response.ok) {
        throw new Error('Error adding product');
      }
  
      const result = await response.json();
      alert(result.message);
      closeModal();  
    } catch (error) {
      console.error(error);
      alert('Error ');
    }
  };
  

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      price: 0,
      category: '',
      description: '',
      stock: 0,
      image: null,
    });
  };

  return (
    <div className="py-2">
      <button
        onClick={openModal}
        className="text-blue-500 font-semibold text-lg hover:text-blue-700"
      >
        + Add
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-bold text-gray-900">Add a New Product</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-2 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Product name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="mt-2 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    placeholder="R2500.00"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="mt-2 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="Sports">Sports</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Home">Home</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Cars">Cars</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Rent">Rent</option>
                    <option value="Food">Food</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="mt-2 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Product Images
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    className="mt-2 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    onChange={handleFileChange}
                    required
                  />
                  {formData.image && (
                    <img
                      src={URL.createObjectURL(formData.image)}  
                      alt="Product Preview"
                      className="mt-2 w-32 h-32 object-cover"
                    />
                  )}
                </div>

                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                    Stock
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    className="mt-2 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductForm;

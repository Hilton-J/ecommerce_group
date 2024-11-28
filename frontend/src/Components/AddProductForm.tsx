import React, { useState } from 'react';

interface FormData {
  name: string;
  price: number;
  category: string;
  description: string;
  stock: number;
  image: File | null;
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

  // Handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value, 
    }));
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 
    setFormData((prevState) => ({
      ...prevState,
      image: file ?? null, 
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price.toString());
    formDataToSend.append('stock', formData.stock.toString());
    formDataToSend.append('category', formData.category);
    formDataToSend.append('seller', localStorage.getItem('_id') || '');  // Assuming the seller's ID is stored in localStorage
  
    // Attach the image if present
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }
  
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No authentication token found. Please log in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:9000/api/products/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,  // Attach token in Authorization header
        },
        body: formDataToSend,  // Use FormData to send the data (for file upload)
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error Response:', errorResponse);  // Log error response
        throw new Error('Error adding product');
      }

      const result = await response.json();
      alert(result.message);  // Show success message
      closeModal();  // Close the modal after successful submission
    } catch (error) {
      console.error(error);
      alert('Error adding product. Please try again later.');
    }
  };

  // Open the modal
  const openModal = () => setIsModalOpen(true);

  // Close the modal and reset form data
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
        + Add Product
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
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
              <div className="space-y-4">
                {/* Input Fields for Product Name, Price, Category, Description, Image, Stock */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    id="category"
                    name="category"
                    className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
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
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    onChange={handleFileChange}
                    required
                  />
                  {formData.image && (
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Product Preview"
                      className="mt-2 w-24 h-24 object-cover"
                    />
                  )}
                </div>

                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductForm;

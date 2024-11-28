import React, { useState } from 'react';

const AddProductForm: React.FC = () => {
  // Individual state variables for each form field
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [stock, setStock] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'price':
        setPrice(parseFloat(value));
        break;
      case 'category':
        setCategory(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'stock':
        setStock(parseFloat(value));
        break;
      default:
        break;
    }
  };

  // Handle file input change (image file)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImage(file);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ensure required fields are filled out
    if (!name || !price || !stock || !category || !description) {
      alert('Please fill in all required fields.');
      return;
    }

    // Get seller's ID from localStorage
    const sellerId = localStorage.getItem('_id');
    if (!sellerId) {
      alert('No seller ID found in localStorage. Please log in.');
      return;
    }

    // Prepare data to send (including image as Base64)
    const data = {
      name,
      description,
      price,
      stock,
      category,
      seller: sellerId,
      image: image ? await convertImageToBase64(image) : null, // Convert image to Base64 if present
    };

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
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Send JSON data
        },
        body: JSON.stringify(data), // Send data as JSON
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error Response:', errorResponse);
        throw new Error('Error adding product');
      }

      const result = await response.json();
      alert(result.message); // Show success message
      closeModal(); // Close the modal after successful submission
    } catch (error) {
      console.error(error);
      alert('Error adding product. Please try again later.');
    }
  };

  // Function to convert image file to Base64
  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file); // Convert the image to a Base64 string
    });
  };

  // Open the modal
  const openModal = () => setIsModalOpen(true);

  // Close the modal and reset form data
  const closeModal = () => {
    setIsModalOpen(false);
    setName('');
    setPrice(0);
    setCategory('');
    setDescription('');
    setStock(0);
    setImage(null);
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
                    value={name}
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
                    value={price}
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
                    value={category}
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
                    value={description}
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
                  />
                  {image && (
                    <img
                      src={URL.createObjectURL(image)}
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
                    value={stock}
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

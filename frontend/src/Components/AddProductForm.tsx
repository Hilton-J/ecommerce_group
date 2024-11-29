import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
// import { IProduct } from "../interfaces/product";
import { useCreateProductMutation } from "../slices/productApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";

const AddProductForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [image, setImage] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [addProduct, { isLoading }] = useCreateProductMutation();

  useEffect(() => {
    if (!userInfo) {
      toast.error("Please log in to access this page.");
      navigate("/login");
    }
  }, [navigate, userInfo]);

  function convertToBase64(e: React.ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const result = reader.result as string;
        setImage(result);
        // console.log("File converted to base64:", result);
      };

      reader.onerror = (error) => {
        console.error("Error converting file to base64:", error);
      };
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInfo) {
      toast.error("User is not logged in.");
      navigate("/login");
      return;
    }

    if (userInfo?.role !== "seller") {
      toast.error("Only a seller can add producs!");
      return;
    }

    try {
      const res = await addProduct({
        name,
        description,
        price,
        stock,
        category,
        image,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Product added successfully!");
      setIsModalOpen(false);
      navigate("/");
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        toast.error((err as { data: { message: string } }).data.message);
      } else {
        toast.error(`An unexpected error occurred: ${err}`);
      }
    }
  };

  // Open the modal
  const openModal = () => setIsModalOpen(true);

  return (
    <div className='py-2'>
      <button
        onClick={openModal}
        className='text-blue-500 font-semibold text-lg hover:text-blue-700'
      >
        + Add Product
      </button>

      {isModalOpen && (
        <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-xl font-bold text-gray-900'>
                Add a New Product
              </h2>
              <button
                // onClick={}
                className='text-gray-500 hover:text-gray-700'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className='space-y-4'>
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Product Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    className='mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor='price'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Price
                  </label>
                  <input
                    type='number'
                    id='price'
                    name='price'
                    className='mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500'
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor='category'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Category
                  </label>
                  <select
                    id='category'
                    name='category'
                    className='mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value='Sports'>Sports</option>
                    <option value='Electronics'>Electronics</option>
                    <option value='Home'>Home</option>
                    <option value='Accessories'>Accessories</option>
                    <option value='Cars'>Cars</option>
                    <option value='Entertainment'>Entertainment</option>
                    <option value='Rent'>Rent</option>
                    <option value='Food'>Food</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor='description'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Description
                  </label>
                  <textarea
                    id='description'
                    name='description'
                    className='mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor='image'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Product Image
                  </label>
                  <input
                    type='file'
                    id='image'
                    name='image'
                    className='mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500'
                    onChange={convertToBase64}
                    required
                  />
                  {image && (
                    <img
                      // src={URL.createObjectURL(image)}
                      alt='Product Preview'
                      className='mt-2 w-24 h-24 object-cover'
                    />
                  )}
                </div>

                <div>
                  <label
                    htmlFor='stock'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Stock
                  </label>
                  <input
                    type='number'
                    id='stock'
                    name='stock'
                    className='mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500'
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    required
                  />
                </div>
              </div>
              {isLoading && <p>Loading...</p>}
              <div className='mt-6 flex justify-end space-x-4'>
                <button
                  type='button'
                  // onClick={closeModal}
                  className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600'
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

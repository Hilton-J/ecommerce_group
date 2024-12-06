// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { RootState } from "../store";
// import { useCreateProductMutation } from "../slices/productApiSlice";
// import { toast } from "react-toastify";

// const AddProductForm: React.FC = () => {
//   // Individual state variables for each form field
//   const [name, setName] = useState<string>("");
//   const [price, setPrice] = useState<number>(0);
//   const [category, setCategory] = useState<string>("");
//   const [description, setDescription] = useState<string>("");
//   const [stock, setStock] = useState<number>(0);
//   const [image, setImage] = useState<string[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

//   const navigate = useNavigate();
//   // const dispatch = useDispatch<AppDispatch>();
//   const { userInfo } = useSelector((state: RootState) => state.auth);
//   const [addProduct, { isLoading }] = useCreateProductMutation();

//   useEffect(() => {
//     if (!userInfo) {
//       toast.error("Please log in to access this page.");
//       navigate("/login");
//     }
//   }, [navigate, userInfo]);

//   function convertToBase64(e: React.ChangeEvent<HTMLInputElement>): void {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();

//       reader.readAsDataURL(file);

//       console.log(reader.result);

//       reader.onload = () => {
//         const result = [reader.result as string];
//         setImage(result);
//       };

//       reader.onerror = (error) => {
//         console.error("Error converting file to base64:", error);
//       };
//     }
//   }

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!userInfo) {
//       toast.error("User is not logged in.");
//       navigate("/login");
//       return;
//     }

//     if (userInfo?.role !== "seller") {
//       toast.error("Only a seller can add products!");
//       return;
//     }

//     try {
//       await addProduct({
//         name,
//         description,
//         price,
//         stock,
//         category,
//         image,
//       }).unwrap();
//       toast.success("Product added successfully!");
//       setIsModalOpen(false);
//       navigate("/");
//     } catch (err) {
//       if (err && typeof err === "object" && "data" in err) {
//         toast.error((err as { data: { message: string } }).data.message);
//       } else {
//         toast.error(`An unexpected error occurred: ${err}`);
//       }
//     }
//   };

//   // Open the modal
//   const openModal = () => setIsModalOpen(true);

//   // Close the modal and reset form data
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setName("");
//     setPrice(0);
//     setCategory("");
//     setDescription("");
//     setStock(0);
//     setImage([]);
//   };

//   return (
//     <div className='py-2'>
//       <button
//         onClick={openModal}
//         className='text-blue-500 font-semibold text-lg hover:text-blue-700'
//       >
//         + Add Product
//       </button>

//       {isModalOpen && (
//         <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50'>
//           <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
//             <div className='flex justify-between items-center mb-6'>
//               <h2 className='text-xl font-bold text-gray-900'>
//                 Add a New Product
//               </h2>
//               <button
//                 // onClick={}
//                 className='text-gray-500 hover:text-gray-700'
//               >
//                 <svg
//                   xmlns='http://www.w3.org/2000/svg'
//                   className='w-6 h-6'
//                   fill='none'
//                   stroke='currentColor'
//                   viewBox='0 0 24 24'
//                   strokeWidth='2'
//                 >
//                   <path
//                     strokeLinecap='round'
//                     strokeLinejoin='round'
//                     d='M6 18L18 6M6 6l12 12'
//                   />
//                 </svg>
//               </button>
//             </div>

//             <form onSubmit={handleSubmit}>
//               <div className='space-y-4'>
//                 <div>
//                   <label
//                     htmlFor='name'
//                     className='block text-sm font-medium text-gray-700'
//                   >
//                     Product Name
//                   </label>
//                   <input
//                     type='text'
//                     id='name'
//                     name='name'
//                     className='mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500'
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor='price'
//                     className='block text-sm font-medium text-gray-700'
//                   >
//                     Price
//                   </label>
//                   <input
//                     type='number'
//                     id='price'
//                     name='price'
//                     className='mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500'
//                     value={price}
//                     onChange={(e) => setPrice(Number(e.target.value))}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor='category'
//                     className='block text-sm font-medium text-gray-700'
//                   >
//                     Category
//                   </label>
//                   <select
//                     id='category'
//                     name='category'
//                     className='mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500'
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     required
//                   >
//                     <option value='Sports'>Sports</option>
//                     <option value='Electronics'>Electronics</option>
//                     <option value='Home'>Home</option>
//                     <option value='Accessories'>Accessories</option>
//                     <option value='Cars'>Cars</option>
//                     <option value='Entertainment'>Entertainment</option>
//                     <option value='Rent'>Rent</option>
//                     <option value='Food'>Food</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor='description'
//                     className='block text-sm font-medium text-gray-700'
//                   >
//                     Description
//                   </label>
//                   <textarea
//                     id='description'
//                     name='description'
//                     className='mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500'
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor='image'
//                     className='block text-sm font-medium text-gray-700'
//                   >
//                     Product Image
//                   </label>
//                   <input
//                     type='file'
//                     id='image'
//                     name='image'
//                     className='mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500'
//                     onChange={convertToBase64}
//                     required
//                   />
//                   {image && (
//                     <img
//                       // src={URL.createObjectURL(image)}
//                       alt='Product Preview'
//                       className='mt-2 w-24 h-24 object-cover'
//                     />
//                   )}
//                 </div>

//                 <div>
//                   <label
//                     htmlFor='stock'
//                     className='block text-sm font-medium text-gray-700'
//                   >
//                     Stock
//                   </label>
//                   <input
//                     type='number'
//                     id='stock'
//                     name='stock'
//                     className='mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500'
//                     value={stock}
//                     onChange={(e) => setStock(Number(e.target.value))}
//                     required
//                   />
//                 </div>
//               </div>
//               {isLoading && <p>Loading...</p>}
//               <div className='mt-6 flex justify-end space-x-4'>
//                 <button
//                   type='button'
//                   onClick={closeModal}
//                   className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md'
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type='submit'
//                   className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600'
//                 >
//                   Add Product
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddProductForm;

import React, { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { useCreateProductMutation } from "../slices/productApiSlice";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  price: 0,
  category: "",
  description: "",
  stock: 0,
  image: [],
  isModalOpen: false,
};

type Action =
  | { type: "SET_FIELD"; field: string; value: string | number }
  | { type: "TOGGLE_MODAL" }
  | { type: "RESET_FORM" };

function reducer(state: typeof initialState, action: Action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "TOGGLE_MODAL":
      return { ...state, isModalOpen: !state.isModalOpen };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

const AddProductForm: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
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
        const result: string | number = reader.result as string | number;
        dispatch({ type: "SET_FIELD", field: "image", value: result });
      };

      reader.onerror = (error) => {
        console.error("Error converting file to base64:", error);
      };
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInfo) {
      toast.error("User is not logged in.");
      navigate("/login");
      return;
    }

    if (userInfo?.role !== "seller") {
      toast.error("Only a seller can add products!");
      return;
    }

    try {
      await addProduct({
        name: state.name,
        description: state.description,
        price: state.price,
        stock: state.stock,
        category: state.category,
        image: state.image,
      }).unwrap();
      toast.success("Product added successfully!");
      dispatch({ type: "RESET_FORM" });
      navigate("/");
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        toast.error((err as { data: { message: string } }).data.message);
      } else {
        toast.error(`An unexpected error occurred: ${err}`);
      }
    }
  };

  return (
    <div className='py-2'>
      <button
        onClick={() => dispatch({ type: "TOGGLE_MODAL" })}
        className='text-blue-500 font-semibold text-lg hover:text-blue-700'
      >
        + Add Product
      </button>

      {state.isModalOpen && (
        <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-xl font-bold text-gray-900'>
                Add a New Product
              </h2>
              <button
                onClick={() => dispatch({ type: "TOGGLE_MODAL" })}
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
                    value={state.name}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_FIELD",
                        field: "name",
                        value: e.target.value,
                      })
                    }
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
                    value={state.price}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_FIELD",
                        field: "price",
                        value: Number(e.target.value),
                      })
                    }
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
                    value={state.category}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_FIELD",
                        field: "category",
                        value: e.target.value,
                      })
                    }
                    required
                  >
                    <option value=''>Select a category</option>
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
                    value={state.description}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_FIELD",
                        field: "description",
                        value: e.target.value,
                      })
                    }
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
                  {state.image.length > 0 && (
                    <img
                      src={state.image[0]}
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
                    value={state.stock}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_FIELD",
                        field: "stock",
                        value: Number(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              </div>
              {isLoading && <p>Loading...</p>}
              <div className='mt-6 flex justify-end space-x-4'>
                <button
                  type='button'
                  onClick={() => dispatch({ type: "TOGGLE_MODAL" })}
                  className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-400'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600'
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

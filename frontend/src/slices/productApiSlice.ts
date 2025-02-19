import { IProduct, Products } from "../interfaces/product";
import { apiSlice } from "./apiSlice";

const PRODUCT_URL = "/api/products";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation<
      {
        success: boolean;
        message: string;
        product: IProduct;
      },
      Partial<IProduct>
    >({
      query: (data) => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    getAllProduct: builder.query<Products, { page?: number }>({
      query: ({ page = 1 }) => `${PRODUCT_URL}?page=${page}`,
      providesTags: ["Product"],
    }),

    updateProduct: builder.mutation<
      {
        success: boolean;
        message: string;
        product: IProduct;
      },
      { id: string; data: Partial<IProduct> }
    >({
      query: ({ id, data }) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    getProductBySeller: builder.query<Products, { page?: number }>({
      query: ({ page = 1 }) => `${PRODUCT_URL}/seller?page=${page}`,
      providesTags: ["Product"],
    }),

    deleteProduct: builder.mutation<
      {
        success: boolean;
        message: string;
        data: IProduct;
      },
      string
    >({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductQuery,
  useUpdateProductMutation,
  useGetProductBySellerQuery,
  useDeleteProductMutation,
} = productsApiSlice;

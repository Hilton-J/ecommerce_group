import { IProduct } from "../interfaces/product";
import { apiSlice } from "./apiSlice";
// import { ObjectId } from "mongodb";

export interface Product {
  products: IProduct[];
  page: number;
  pages: number;
  totalProducts: number;
}

const PRODUCT_URL = "/api/products";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    getAllProduct: builder.query<Product , void>({
      query: () => `${PRODUCT_URL}`,
    }),

    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "PUT",
        data: data,
      }),
    }),
    getProductBySeller: builder.query({
      query: () => `${PRODUCT_URL}/seller`,
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "DELETE",
      }),
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

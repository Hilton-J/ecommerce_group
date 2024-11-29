// import { IProduct } from "../interfaces/product";
import { apiSlice } from "./apiSlice";
// import { ObjectId } from "mongodb";

export interface IProduct {
  name: string;
  price: number;
  category: string;
  description: string;
  stock: number;
  image: File | null;
  seller: string;
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
  }),
});

export const { useCreateProductMutation } = productsApiSlice;

import { apiSlice } from "./apiSlice";
// import { ObjectId } from "mongodb";

const USERS_URL = "/api/users";

interface LoginRequest {
  email: string;
  password: string;
}

export interface userResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  // token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
  companyName?: string;
  companyRegistration?: string;
  adress?: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<userResponse, LoginRequest>({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation<userResponse, RegisterRequest>({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  userApiSlice;

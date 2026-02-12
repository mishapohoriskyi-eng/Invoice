"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
}

const TAG_TYPE_PRODUCTS = "Products";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com/",
  }),
  tagTypes: [TAG_TYPE_PRODUCTS],
  endpoints: (builder) => ({
    // GET всіх продуктів з query параметрами
    getProducts: builder.query<Product[], string>({
      query: (queryParams) => {
        return {
          url: `/products${queryParams ? queryParams : "?limit=100000"}`,
          method: "GET",
        };
      },
      providesTags: [TAG_TYPE_PRODUCTS],
    }),

    // GET одного продукту
    getProductById: builder.query<Product, string>({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "GET",
        };
      },
      providesTags: [TAG_TYPE_PRODUCTS],
    }),

    // POST - створити продукт
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (newProduct) => {
        return {
          url: "/products",
          method: "POST",
          body: newProduct,
        };
      },
      invalidatesTags: [TAG_TYPE_PRODUCTS],
    }),

    // PATCH - оновити продукт
    updateProduct: builder.mutation<
      Product,
      { id: number; updates: Partial<Product> }
    >({
      query: ({ id, updates }) => {
        return {
          url: `/products/${id}`,
          method: "PATCH",
          body: updates,
        };
      },
      invalidatesTags: [TAG_TYPE_PRODUCTS],
    }),

    // DELETE - видалити продукт
    deleteProduct: builder.mutation<void, number>({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [TAG_TYPE_PRODUCTS],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;

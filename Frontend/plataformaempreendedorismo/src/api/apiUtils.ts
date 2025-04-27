import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const publicFetchBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL
});
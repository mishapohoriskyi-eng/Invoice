import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

/**
 * A configuration object for RTK query, we get the token from state and
 * set the bearer token
 */
const baseQuery = fetchBaseQuery({
  baseUrl: "https://fakestoreapi.com/",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).token.value;
    if (token) {
      try {
        const tokenData = JSON.parse(token);
        headers.set("Authorization", `Bearer ${tokenData.access_token}`);
      } catch {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

export default baseQuery;

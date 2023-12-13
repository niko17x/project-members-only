import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// baseUrl is empty b/c of setting proxy for http
const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});

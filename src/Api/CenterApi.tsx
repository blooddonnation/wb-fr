// src/services/centerApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BloodCenter } from '../Models/Center';

/**
 * centerApi: RTK Query “API slice” replicating Retrofit's CenterApi.
 * - baseQuery uses fetchBaseQuery under the hood. :contentReference[oaicite:0]{index=0}
 * - endpoint `getCenters` corresponds to @GET("api/centers") :contentReference[oaicite:1]{index=1}
 */
export const centerApi = createApi({
  reducerPath: 'centerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8082/',    // same base URL as Retrofit :contentReference[oaicite:2]{index=2}
  }),
  endpoints: (builder) => ({
    getCenters: builder.query<BloodCenter[], void>({
      query: () => 'api/centers',           // GET /api/centers
    }),
  }),
});

// Export the auto‑generated hook for use in React components
export const { useGetCentersQuery } = centerApi;

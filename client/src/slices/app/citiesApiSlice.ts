import { apiSlice } from "../authentication/apiSlice";
import { City } from "../../types";

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCities: builder.query<City[],({ _: string })>({
      query: ({ _ }) =>  '/api/cities'
    })
  })
})

export const{
  useGetCitiesQuery,
} = eventsApiSlice
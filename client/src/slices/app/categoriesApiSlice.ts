import { apiSlice } from "../authentication/apiSlice";
import { postCategory } from "../../types";

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createCategory: builder.mutation<postCategory,{category: string}>({
      query: ({category}) => {
        return{
          url: '/api/category',
          method:'POST',
          body: {name: category}
        }
      }
    })
  })
})

export const{
  useCreateCategoryMutation
} = eventsApiSlice
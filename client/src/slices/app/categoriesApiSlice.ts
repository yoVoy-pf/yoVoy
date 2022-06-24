import { apiSlice } from "../authentication/apiSlice";
import { postCategory, Category } from "../../types";

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
    }),
    getCategories: builder.query<Category[],({ _: string })>({
      query: ({ _ }) =>  '/api/categories'
    })
  })
})

export const{
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} = eventsApiSlice
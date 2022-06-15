import { apiSlice } from "../authentication/apiSlice";
import { postOrganization } from "../../types";

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createOrganization: builder.mutation<postOrganization,{organization: string}>({
      query: ({organization}) => {
        return{
          url: '/api/organization',
          method:'POST',
          body: {name: organization}
        }
      }
    })
  })
})

export const{
  useCreateOrganizationMutation,
} = eventsApiSlice
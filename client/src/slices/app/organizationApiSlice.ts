import { apiSlice } from "../authentication/apiSlice";
import { postOrganization, getOrganization } from "../../types";

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
    }),
    getOrganizations: builder.query<getOrganization[],{_:string}>({
      query: ({_}) => {
        return{
          url:`/api/organizations`
        }
      }
    })
  })
})

export const{
  useCreateOrganizationMutation,
  useGetOrganizationsQuery,
} = eventsApiSlice
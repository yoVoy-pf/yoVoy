import { apiSlice } from "../authentication/apiSlice";
import { Event } from "../../types";

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    updateEvent: builder.mutation<Event,{id: string, updatedEvent: any}>({
      query: ({id, updatedEvent}) => {
        // do something
        return{
          url: `/api/event/${id}`,
          method:`PUT`,
          body: {...updatedEvent}
        }
      }
    }),
    getEvent: builder.query<Event,{id: string}>({
      query: ({id}) => {
      console.log({id})
      return {
        url: `api/event/${id}`
      }
      }
    })
  })
})

export const{
  useUpdateEventMutation,
  useGetEventQuery,
} = eventsApiSlice
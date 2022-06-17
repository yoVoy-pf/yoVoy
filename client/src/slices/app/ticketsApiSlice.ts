import { apiSlice } from "../authentication/apiSlice";
import { getTickets } from "../../types";

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getTicketsDetail: builder.query<getTickets[],{_: string}>({
      query: ({_}) => {
        return{
          url: '/api/tickets',
        }
      }
    })
  })
})

export const{
  useGetTicketsDetailQuery
} = eventsApiSlice
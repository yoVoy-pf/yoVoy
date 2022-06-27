import { apiSlice } from "../authentication/apiSlice";
import { Location } from '../../types'

// interface LocationUpdate {
//         name: string;
//         address: string;
//         cityId: string;
// }

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getLocations: builder.query<any,({ _: string })>({
      query: ({ _ }) =>  '/api/locations'
    }),
    getLocation: builder.query<any, { id: any }>({
      query(id) {
        return {
          url: `/api/location/${id}`
        }
      }
    }),
    updateLocation: builder.mutation<Location[], { id: any; updateLocation: any }>({
			query: ({ id, ...updateLocation }) => {
				return {
					url: `api/location/${id}`,
					method: `PUT`,
					body: { ...updateLocation },
				};
			},
		}),
    createLocacion: builder.mutation<any,{name: any, latitude: any, length: any, address:any, cityId: any}>({
      query: ({name, latitude, length, address, cityId}) => {
        return{
          url: '/api/location',
          method:'POST',
          body: {
            name, 
            latitude, 
            length, 
            address, 
            cityId
          }
        }
      }
    }),
  })
})

export const{
  useGetLocationsQuery,
  useUpdateLocationMutation,
  useGetLocationQuery,
  useCreateLocacionMutation,
} = eventsApiSlice
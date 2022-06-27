import { apiSlice } from "../authentication/apiSlice";
import { Location } from '../../types'
import { getAllLocations } from "../adminPanelSlice";

interface LocationUpdate {
        name: string;
        address: string;
        cityId: string;
}

export const locationsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getLocations: builder.mutation<any, { limit: string, offset: string}>({
			query: ({ limit, offset }) =>{
        let url = `/api/locations?limit=${limit}&offset=${offset}`;
        return{
          url,
        }
      } ,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try{
          const { data } = await queryFulfilled
          dispatch(getAllLocations(data))
        }catch(err){
          console.log('Error fetching post!')
          console.log(err)
        }
      }
		}),
    getLocation: builder.query<LocationUpdate, { id: any }>({
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
  })
})

export const{
  useGetLocationsMutation,
  useUpdateLocationMutation,
  useGetLocationQuery,
} = locationsApiSlice
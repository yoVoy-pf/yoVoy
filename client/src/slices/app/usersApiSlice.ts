import { apiSlice } from '../authentication/apiSlice';
import { User, Event, putRolUser } from '../../types';

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getFavorites: builder.query<any, { _: string }>({
			query: ({ _ }) => '/api/user/favorites',
		}),
		getUsers: builder.query<User[], { _: string }>({
			query: ({ _ }) => '/api/users',
		}),
		getUser: builder.query<User, { id: any }>({
			query(id) {
				console.log(id);
				return {
					url: `/api/users/${id}`,
				};
			},
		}),
		getUserData: builder.query<any, { _: string }>({
			query: ({ _ }) => '/api/user/information',
		}),
		getTickets: builder.query<any, { _: string }>({
			query: ({ _ }) => '/api/user/tickets',
		}),
		updateUser: builder.mutation<User[], { id: any; updateUser: any }>({
			query: ({ id, ...updateUser }) => {
				return {
					url: `api/users/${id}`,
					method: `PUT`,
					body: { ...updateUser },
				};
			},
		}),
		updateRolUser: builder.mutation<putRolUser, { userId: any; roleId: any }>({
			query: ({ userId, roleId }) => {
				console.log('asdgagasdg:', userId, 'gfsadgagagd:', roleId);
				return {
					url: `api/user/role`,
					method: `PUT`,
					body: { userId: userId, roleId: roleId },
				};
			},
		}),
		putPassword: builder.mutation<putRolUser, { userId: any }>({
			query: ({ userId }) => {
				return {
					url: `api/user/resetPassword`,
					method: `PUT`,
					body: { userId: userId },
				};
			},
		}),
		deleteUser: builder.mutation<User, { id: number }>({
			query(id) {
				return {
					url: `api/users/${id}`,
					method: `Delete`,
				};
			},
		}),
		deleteEventToFavorite: builder.mutation<Event, { id: number }>({
			query(id) {
			  return {
				url:`api/user/favorites/${id}`,
				method:`Delete`,
			  }
			}
		}),
		getFavorite: builder.query<Event, { id: any }>({
			query(id) {
				return {
					url: `/api/user/favorites/${id}`,
				};
			},
		}),
		  
	}),
});

export const {
	useGetUsersQuery,
	useGetFavoritesQuery,
	useGetUserQuery,
	useGetUserDataQuery,
	useDeleteUserMutation,
	useUpdateUserMutation,
	useGetTicketsQuery,
	useUpdateRolUserMutation,
	usePutPasswordMutation,
	useDeleteEventToFavoriteMutation,
	useGetFavoriteQuery,
} = usersApiSlice;

import { apiSlice } from '../authentication/apiSlice';
import { postOrganization, getOrganization } from '../../types';

export const eventsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createOrganization: builder.mutation<
			postOrganization,
			{ organization: string }
		>({
			query: ({ organization }) => {
				return {
					url: '/api/organization',
					method: 'POST',
					body: { name: organization },
				};
			},
		}),
		getOrganizations: builder.query<getOrganization[], { _: string }>({
			query: ({ _ }) => {
				return {
					url: `/api/organizations`,
				};
			},
		}),
		getOrganization: builder.query<getOrganization, { id: any }>({
			query(id) {
				return {
					url: `/api/organization/${id}`,
				};
			},
		}),
		getOrganizationEvents: builder.query<any, { _: string }>({
			query: ({ _ }) => '/api/organization/events',
		}),
		updateOrganization: builder.mutation<
			getOrganization,
			{ id: any; updateOrganization: any }
		>({
			query: ({ id, ...updateOrganization }) => {
				return {
					url: `api/organization/${id}`,
					method: `PUT`,
					body: { ...updateOrganization },
				};
			},
		}),
		deleteOrganization: builder.mutation<
			postOrganization,
			{ id: number | string }
		>({
			query(id) {
				return {
					url: `api/organization/${id}`,
					method: `Delete`,
				};
			},
		}),
	}),
});

export const {
	useCreateOrganizationMutation,
	useGetOrganizationsQuery,
	useGetOrganizationQuery,
	useUpdateOrganizationMutation,
	useDeleteOrganizationMutation,
	useGetOrganizationEventsQuery,
} = eventsApiSlice;

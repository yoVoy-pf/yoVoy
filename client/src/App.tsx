import { Route, Routes } from 'react-router-dom';
import Event from './components/Event/Event'; // ->Usarlo dentro de EventsLocation
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Layout from './components/Layout/Layout';
import RequireAuth from './components/RequireAuth.ts/RequireAuth';
import { Welcome } from './components/Welcome/Welcome';
import UsersList from './components/AdminPanel/UsersList/UsersList';
import { useGetUserAuthQuery } from './slices/authentication/authApiSlice';
import CreateCategory from './components/AdminPanel/CreateCategory/CreateCategory';
import UpdateEvent from './components/UpdateEvent/UpdateEvent';
import Unauthorized from './components/Unauthorized/Unauthorized';
import ROLES_LIST from './slices/authentication/rolesList';
import CreateEvent from './components/CreateEvent/CreateEvent';
import Loading from './components/Loading/Loading';
import Favorites from './components/Favorites/Favorites';
import Updateuser from './components/AdminPanel/UpdateUser/UpdateUser';
import EventsConfig from './components/AdminPanel/EventsConfig/EventsConfig';
import CreateOrganization from './components/CreateOrganization/CreateOrganization';
import OrganizationList from './components/AdminPanel/OrganizationList/OrganizationList';
import UpdateOrganization from './components/AdminPanel/UpdateOrganization/updateOrganization';
import UserPurchaseDetail from './components/UserPurchaseDetail/UserPurchaseDetail';
import DetailPayment from './components/AdminPanel/DetailPayment/DetailPayment';
import UpdateRol from './components/AdminPanel/UpdateRol/UpdateRol';
import OrganizationEvents from './components/OrganizationEvents/OrganizationEvents';
import EventLocations from './components/EventLocations/EventLocations';
import DetailProessPayment from './components/AdminPanel/DetailPayment/DetailProcessPayment';
import UserData from './components/UserData/UserData';

import UnbanUser from './components/AdminPanel/UnbanUser/UnbanUser';
import ChangePassword from './components/ChangePassword/ChangePassword';
import CategoriesList from './components/AdminPanel/CategoriesList/CategoriesList';
import UpdateCategory from './components/AdminPanel/UpdateCategories/UpdateCategories';
import LocationsList from './components/AdminPanel/LocationsList/LocationsList';
import UpdateLocation from './components/AdminPanel/UpdateLocations/UpdateLocation';
import CitiesList from './components/AdminPanel/CitiesList/CitiesList'

function App(): JSX.Element {
	useGetUserAuthQuery();

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				{/* public routes */}
				<Route index element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<Signup />} />
				<Route
					path="events/:id/:location"
					element={
							<Event />
					}
				/>
				<Route path="events/:id" element={<EventLocations />} />
				<Route path="unauthorized" element={<Unauthorized />} />
				<Route path="loading" element={<Loading />} />

				{/* protected routes */}

				<Route element={<RequireAuth allowedRoles={[ROLES_LIST.User]} />}>
					<Route path="welcome" element={<Welcome />} />
					<Route path="favorites" element={<Favorites />} />
					<Route path="create-Organization" element={<CreateOrganization />} />
					<Route path="purchase-detail" element={<UserPurchaseDetail />} />
					<Route path="user/information" element={<UserData />} />
					<Route path="change-password" element={<ChangePassword />} />
				</Route>

				<Route
					element={<RequireAuth allowedRoles={[ROLES_LIST.Organization]} />}
				>
					<Route path="update-event/:eventId" element={<UpdateEvent />} />
					<Route path="create-event" element={<CreateEvent />} />
					<Route path="organization-events" element={<OrganizationEvents />} />
				</Route>
				{/* 404 */}
				<Route path="*" element={<Home />} />
			</Route>
			<Route element={<RequireAuth allowedRoles={[ROLES_LIST.Admin]} />}>
				<Route path="userslist" element={<UsersList />} />
				<Route path="create-category" element={<CreateCategory />} />
				<Route path="update-user/:id" element={<Updateuser />} />
				<Route path="events-config" element={<EventsConfig />} />
				<Route path="organization-list" element={<OrganizationList />} />
				<Route
					path="update-organization/:id"
					element={<UpdateOrganization />}
				/>
				<Route path="detail-payment" element={<DetailPayment />} />
				<Route path="update-rol/:id" element={<UpdateRol />} />
				<Route
					path="detail-process-payment/:id"
					element={<DetailProessPayment />}
				/>
				<Route path="list-categories" element={<CategoriesList/>} />
				<Route path="update-category/:id" element={<UpdateCategory/>}/>
				<Route path="list-locations" element={<LocationsList/>}/>
				<Route path="update-location/:id" element={<UpdateLocation/>}/>
				<Route path="list-cities" element={<CitiesList/>}/>
			</Route>
			<Route path="unban-user" element={<UnbanUser />} />
		</Routes>
	);
}

export default App;

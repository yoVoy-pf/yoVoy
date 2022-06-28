import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEventByCategory } from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';
import { selectAllLocations, selectAllOrganizations, selectAllProvinces, selectAllUsers } from '../../slices/adminPanelSlice';
import { useGetLocationsMutation } from '../../slices/app/locationsApiSlice';
import { useGetOrganizationsMutation } from '../../slices/app/organizationApiSlice';
import { useGetUsersMutation } from '../../slices/app/usersApiSlice';
import {useGetProvincesMutation} from '../../slices/app/provincesApiSlice'
import { useGetUserRequestsMutation } from '../../slices/app/requestsApiSlice';
import { selectUserRequests } from '../../slices/requestSlice';

const usePagination = (itemsPerPage : number = 15, type : string) => {
  const [getUsers] = useGetUsersMutation();
  const [getOrganizations] = useGetOrganizationsMutation();
  const [getLocations] : any = useGetLocationsMutation();
  const [getProvinces] : any = useGetProvincesMutation();
  const [getUserRequests] : any = useGetUserRequestsMutation();
  const dispatch: AppDispatch = useDispatch();
  let items :any 
  const [page, setPage] : any= useState(0);
  const [filters, setFilters] : any = useState([])
  const [userOrder, setUserOrder]: any = useState('')
  const [email, setEmail] : any = useState('')
  const [eventName, setEventName] : any = useState('')

  const events = useSelector((state: State) => state.global.allEvents);
  const users = useSelector(selectAllUsers)
  const organizations = useSelector(selectAllOrganizations)
  const locations = useSelector(selectAllLocations);
  const provinces = useSelector(selectAllProvinces);
  const userRequests = useSelector(selectUserRequests);

  switch(type){
    case 'events':
      items = events;
      break;
    case 'users':
      items = users;
      break;
    case 'organizations':
      items = organizations;
      break;
    case 'locations':
      items = locations;
      break;
    case 'provinces':
      items = provinces;
      break;
    case 'requests':
      items = userRequests;
      break;
      default:
        items = events;
      }
  const limit = Math.ceil(items?.count / itemsPerPage);
  
  const queryOptions = {
    limit: itemsPerPage.toString(),
    offset: (page * itemsPerPage).toString(),
  }

  const queries : any = {
    events: (clear: any) => dispatch(getEventByCategory(clear ? [] : filters, itemsPerPage.toString(), (page * itemsPerPage).toString(), clear ? '' : eventName)),
    users: () => getUsers({ ...queryOptions, email: email, order: userOrder }),
    organizations: () => getOrganizations({ ...queryOptions }),
    locations: () => getLocations({ ...queryOptions }),
    provinces: () => getProvinces({ ...queryOptions }),
    requests: () => getUserRequests({ ...queryOptions }),
  }

  const refresh = (clear : any=false) => {
    if (clear) setFilters([])
    if (clear) setEventName('')
    queries[type](clear);
  }

  useEffect(() => {
    queries[type]();
  }, [page]);

  useEffect(() => {
    setPage(0)
    queries.events();
  }, [filters])

  useEffect(() => {
    if (type === 'users') queries.users();
  }, [userOrder])

  const nextHandler = () => {
    return page < limit - 1 && setPage(page + 1);
  };

  const pageButtonHandler = (e: any, page: any) => {
    setPage(page-1);
  };

  const prevHandler = () => {
    return page > 0 && setPage(page - 1);
  };

  const searchUserQuery = (e: any, input: string) => {
    setPage(0)
    setEmail(input)
    if (input.length){
      getUsers({ limit: itemsPerPage.toString(), offset: (page * itemsPerPage).toString(), email: input });
    } else getUsers({ limit: itemsPerPage.toString(), offset: (page * itemsPerPage).toString() });
  }

  const searchEventQuery = (e: any, input: string) => {
    setPage(0)
    setEventName(input)
    console.log(input)
    if (input.length){
      dispatch(getEventByCategory(filters, itemsPerPage.toString(), (0 * itemsPerPage).toString(), input))
    } else queries.events();
  }

  return {
    nextHandler,
    prevHandler,
    pageButtonHandler,
    setPage,
    limit,
    filters,
    setFilters,
    email,
    setEmail,
    searchUserQuery,
    page,
    userOrder,
    setUserOrder,
    refresh,
    searchEventQuery
  };
};

export default usePagination;
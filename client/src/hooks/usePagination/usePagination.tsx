import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEventByCategory } from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';
import { selectAllOrganizations, selectAllUsers } from '../../slices/adminPanelSlice';
import { useGetOrganizationsMutation } from '../../slices/app/organizationApiSlice';
import { useGetUsersMutation } from '../../slices/app/usersApiSlice';

const usePagination = (itemsPerPage : number = 15, type : string) => {
  const [getUsers] = useGetUsersMutation();
  const [getOrganizations] = useGetOrganizationsMutation();
  const dispatch: AppDispatch = useDispatch();
  let items :any 
  const [page, setPage] : any= useState(0);
  const [filters, setFilters] : any = useState([])
  const [userOrder, setUserOrder]: any = useState('')
  const [email, setEmail] : any = useState('')

  const events = useSelector((state: State) => state.global.allEvents);
  const users = useSelector(selectAllUsers)
  const organizations = useSelector(selectAllOrganizations)

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
      default:
        items = events;
      }
  const limit = Math.ceil(items.count / itemsPerPage);

  const queries : any = {
    events: () => dispatch(getEventByCategory(filters, itemsPerPage.toString(), (page * itemsPerPage).toString())),
    users: () => getUsers({ limit: itemsPerPage.toString(), offset: (page * itemsPerPage).toString(), email: email, order: userOrder }),
    organizations: () => getOrganizations({ limit: itemsPerPage.toString(), offset: (page * itemsPerPage).toString() })
  }

  const refresh = () => {
    queries[type]();
  }

  useEffect(() => {
    queries[type]();
  }, [page]);

  useEffect(() => {
    setPage(0)
    queries.events();
  }, [filters])

  useEffect(() => {
    queries.users();
  }, [userOrder])

  const nextHandler = () => {
    return page < limit - 1 && setPage(page + 1);
  };

  const pageButtonHandler = (e: any, page: any) => {
    console.log(e)
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
    refresh
  };
};

export default usePagination;
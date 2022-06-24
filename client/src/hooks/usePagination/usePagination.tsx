import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvent, getEventByCategory } from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';

const usePagination = (itemsPerPage = 15, type = 'events') => {
  const dispatch: AppDispatch = useDispatch();
  let items :any 
  const [page, setPage] : any= useState(0);
  const [filters, setFilters] : any = useState([])
  const events = useSelector((state: State) => state.global.allEvents);
  switch(type){
    case 'events':
      items = events;
      break;
      default:
        items = events;
      }
  const limit = Math.ceil(items.count / itemsPerPage);

  useEffect(() => {
    if (type === 'events') dispatch(getAllEvent(itemsPerPage.toString(), (page * itemsPerPage).toString()));
  }, [page]);

  useEffect(() => {
    setPage(0)
    dispatch(getEventByCategory(filters, itemsPerPage.toString(), (page * itemsPerPage).toString()));
  }, [filters])

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

  return {
    nextHandler,
    prevHandler,
    pageButtonHandler,
    setPage,
    limit,
    filters,
    setFilters
  };
};

export default usePagination;
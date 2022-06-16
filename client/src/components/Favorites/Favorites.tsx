import { useEffect, useState } from "react";
import { useGetFavoritesQuery } from "../../slices/app/usersApiSlice"
import Card from '../Card/Card';
import style from "../Events/Events.module.css"

const Favorites = () => {

    const [favorites, setFavorites] = useState([]);
    let { data, isError,isFetching } = useGetFavoritesQuery({ _: "" }, { refetchOnMountOrArgChange: true, })
    useEffect(() => {
    if (!isFetching){
      isError
      ? setFavorites([])
      : setFavorites(data)
    }
    }, [isFetching])

    const content = isFetching
    ?  <h1>Cargando...</h1>
    : <div className={style.container}>
        {favorites && favorites?.length > 0 && favorites?.map((e: any) => <Card key={e.id} event={e} />)}
      </div>
    return (
        <div>
          {content}
        </div>
    )
}

export default Favorites
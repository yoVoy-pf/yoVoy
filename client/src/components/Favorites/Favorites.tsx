import { useEffect, useState } from "react";
import { useGetFavoritesQuery } from "../../slices/app/usersApiSlice"
import Card from '../Card/Card';
import style from "../Events/Events.module.css"
import './Favorites.css'

const Favorites = () => {

    const [favorites, setFavorites] = useState<any>([]);
    let { data, isError,isFetching } = useGetFavoritesQuery({ _: "" }, { refetchOnMountOrArgChange: true, })
    useEffect(() => {
    if (!isFetching){
      isError
      ? setFavorites(["no hay"])
      : setFavorites(data)
    }
    }, [isFetching])

    const content = isFetching
    ?  <h1>Cargando...</h1>
    : <div className={favorites[0]!=="no hay"? style.container:""}>
        {favorites && favorites?.length > 0 && favorites?.map((e: any) =>
          e==="no hay"?
          <h1 className={"text_alert"}>No hay favoritos aun</h1> :
          <Card key={e.id} event={e} />
        )}
      </div>
    return (
        <div>
          {content}
        </div>
    )
}

export default Favorites
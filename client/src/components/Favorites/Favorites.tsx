import { useEffect, useState } from "react";
import { useGetFavoritesQuery } from "../../slices/app/usersApiSlice"
import { useDeleteEventToFavoriteMutation } from '../../slices/app/usersApiSlice';
import Card from '../Card/Card';
import style from "../Events/Events.module.css"
import './Favorites.css'

const Favorites = () => {

   const [deleteEventToFavorite] = useDeleteEventToFavoriteMutation()

    const [favorites, setFavorites] = useState<any>([]);
    let { data, isError,isFetching, refetch} = useGetFavoritesQuery({ _: "" }, { refetchOnMountOrArgChange: true, })
    useEffect(() => {
    if (!isFetching){
      isError
      ? setFavorites(["no hay"])
      : setFavorites(data)
    }
    }, [isFetching])

    const handleDelete = async (id: any) => {
      if (
        window.confirm('Seguro que quieres eliminar este evento de la lista?')
      ){
        await deleteEventToFavorite(id)
        refetch()
        alert('Evento favorito eliminado correactamente')
      }
    }

    const content = isFetching
    ?  <h1>Cargando...</h1>
    : <div className={favorites[0]!=="no hay"? style.container:""}>
        {favorites && favorites?.length > 0 && favorites?.map((e: any) =>
          e==="no hay"?
          <h1 className={"text_alert"}>No hay favoritos aun</h1> :
          <div>
            <button className={"deleteFav"} onClick={()=>{handleDelete(e.id)}}>X</button>
            <Card key={e.id} event={e} />
          </div>
        )}
      </div>
    return (
        <div>
          {content}
        </div>
    )
}

export default Favorites
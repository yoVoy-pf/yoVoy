import { useEffect, useState } from "react";
import { useGetFavoritesQuery } from "../../slices/app/usersApiSlice"
import Card from '../Card/Card';
import style from "../Events/Events.module.css"



const Favorites = () => {


    let { data } = useGetFavoritesQuery({ _: "" }, { refetchOnMountOrArgChange: true, })
    if (!data) {
        data = ["no hay"]
    }

    console.log(data)


    useEffect(() => {
        return () => {
            data = [] //vacia los ententos, pero no funciona.
            console.log(data)
        }
    }, [])

    return (
        <div>
            <div className={style.container}>
                {data && data?.length > 0 ? data?.map((e: any) => <Card key={e.id} event={e} />) : <h1>cargando</h1>}
            </div>
            {/* <button onClick={() => { console.log(data) }}>ver data</button> */}
        </div>
    )
}

export default Favorites
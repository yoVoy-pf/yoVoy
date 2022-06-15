import { useEffect, useState } from "react";
import { useGetFavoritesQuery } from "../../slices/app/usersApiSlice"
import Card from '../Card/Card';



const Favorites = () => {
  
  
    let {data} = useGetFavoritesQuery({_:""},{refetchOnMountOrArgChange: true,})
    if(!data){
      data=["no hay"]
    }

    console.log(data)
    
    
    useEffect(() => {
        return ()=>{
            data = []
            console.log(data)
        }
    }, [])

    return (
        <div>

            {/* { data && data?.length > 0 ? data?.map((e: any) => <Card key={e.id} event={e} />) : <h1>cargando</h1>} */}
            {/* <button onClick={() => { console.log(data) }}>ver data</button> */}

        </div>
    )
}

export default Favorites
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useGetEventQuery, useUpdateEventMutation } from "../../slices/app/eventsApiSlice"
import { useParams } from "react-router-dom";
import { putEvent } from "../../types";

type Input = React.ChangeEvent<HTMLInputElement>;
type InputText = React.ChangeEvent<HTMLTextAreaElement>;

const UpdateEvent = () => {
    const navigate = useNavigate()
    const {eventId} = useParams()
    const {data: eventInfo} = useGetEventQuery({id: '1'});
    console.log(eventInfo)
    const [updateEvent] = useUpdateEventMutation()

    useEffect(() => {
      let mappedCategoriesIds = eventInfo?.categories?.map((c: any) => c.id)
      let mappedLocations = eventInfo?.locations?.map((loc: any) => ({
        id: loc.id,
        dates: loc.dates
      }),[eventInfo])

      console.log({mappedLocations})
      setEvent({
        name: eventInfo?.name || '',
        description: eventInfo?.description || '',
        background_image: eventInfo?.background_image || '',
        categoriesIds: mappedCategoriesIds || [],
        locations: mappedLocations || [],
      })
    },[eventInfo])

    const [event, setEvent] = useState<putEvent>({
        name: '',
        description: '',
        background_image: '',
        categoriesIds: [],
        locations: [],
    });
    
    const onInputChange = (e: Input | InputText) => {
        e.preventDefault();
      if (e.target.name === 'price' || e.target.name === 'date'){
            console.log({...event})
          let response: any = JSON.parse(JSON.stringify(event.locations));
            let newDate = {...response[0].dates[0]}
            newDate[e.target.name] = e.target.value
            console.log('response:', response[0].dates[0])
            console.log('newDate:', newDate)
            Object.assign(response[0].dates[0], newDate)
            // response[0].dates[0] = newDate
            console.log(response)
            setEvent({
                ...event,
                locations: response
            })
        } else {
            setEvent({
                ...event,
                [e.target.name]: e.target.value,
              });
        }
       
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        console.log({eventId});
        const updatedData = {
          name: event.name,
          description: event.description,
          background_image: event.background_image,
          categoriesIds: event.categoriesIds,
          locations: event.locations
        }
        eventId && await updateEvent({id:eventId, updatedEvent:updatedData })
        setEvent({
            name: '',
            description: '',
            background_image: '',
            categoriesIds:[],
            locations: [],
        })
        navigate('/')
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <label>Nombre del Evento</label> <br />
                <input 
                    type="text" 
                    value={event.name}
                    name='name'
                    onChange={onInputChange}
                /> <br />
                <label>Descripción</label> <br />
                <textarea 
                    value={event.description}
                    name='description'
                    onChange={onInputChange}
                /> <br />
                <label>Imagen</label> <br />
                <input 
                    type="text" 
                    value={event.background_image}
                    name='background_image'
                    onChange={onInputChange}
                /> <br />
                <label>Categoria</label> <br />
                <input
                    type="text" 
                    value={event.categoriesIds[0]}
                    name='categoriesIds'
                    onChange={onInputChange}
                /> <br />
                <label>Precio</label> <br />
                <input 
                    type="text" 
                    value={event?.locations[0]?.dates[0]?.price}
                    name='price'
                    onChange={onInputChange}
                /> <br />
                <label>Fecha</label> <br />
                <input 
                    type="date" 
                    value={event?.locations[0]?.dates[0]?.date}
                    name='date'
                    onChange={onInputChange}
                /> <br />
                <button type="submit">¡Actualizar Evento!</button>
            </form>
        </div>
    )
}

export default UpdateEvent
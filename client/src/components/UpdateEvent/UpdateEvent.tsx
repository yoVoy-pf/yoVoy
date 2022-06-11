import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { putUpdateEvent } from "../../redux/actions/actions-Create";
import { AppDispatch } from "../../redux/store/store"
import { useNavigate } from "react-router-dom";
import { useGetEventQuery, useUpdateEventMutation } from "../../services/eventsApiSlice"
import { useParams } from "react-router-dom";
import { putEvent } from "../../types";



const UpdateEvent = () => {
    // const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate()
    const {eventId} = useParams()
    const {data: eventInfo} = useGetEventQuery({id: '1'});
    console.log(eventInfo)
    const [updateEvent] = useUpdateEventMutation()

    useEffect(() => {

      let mappedCategoriesIds = eventInfo?.categories?.map(c => c.id)
      let mappedLocations = eventInfo?.locations?.map(loc => ({
        id: loc.id,
        dates: loc.dates
      }))

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
    
    const onInputChange = (e:any) => {
        e.preventDefault();
        setEvent({
          ...event,
          [e.target.name]: e.target.value,
        });
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        // dispatch(putUpdateEvent(event))
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
                <label>Descripción</label> <br />
                <textarea 
                    value={event.description}
                    name='description'
                    onChange={onInputChange}
                /> <br />
                <button type="submit">¡Actualizar Evento!</button>
            </form>
        </div>
    )
}

export default UpdateEvent
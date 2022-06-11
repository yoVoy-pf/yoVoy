import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { putUpdateEvent } from "../../redux/actions/actions-Create";
import { AppDispatch } from "../../redux/store/store"
import { useNavigate } from "react-router-dom";

const UpdateEvent = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate()

    const [event, setEvent] = useState({
        name: ''
    });
    
    const onInputChange = (e:any) => {
        e.preventDefault();
        setEvent({
          ...event,
          [e.target.name]: e.target.value,
        });
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        dispatch(putUpdateEvent(event))
        setEvent({
            name: ''
        })
        navigate('/')
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <label>Nombre de la Event</label> <br />
                <input 
                    type="text" 
                    placeholder="Nombre"
                    value={event.name}
                    name='name'
                    required
                    onChange={onInputChange}
                /> <br />
                <button type="submit">¡Actualizar Evento!</button>
            </form>
        </div>
    )
}

export default UpdateEvent
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  getCategories,
  getLocations,
} from '../../redux/actions/actions-Create';
import { AppDispatch, State } from '../../redux/store/store';
import { Category, Location } from '../../types';
import DatesModal from '../CreateEvent/CreateEventModal/DatesModal'
import { useCreateEvent } from '../CreateEvent/useCreateEvent';
import { useDatesModal } from '../CreateEvent/CreateEventModal/useDatesModal';
import { useGetEventQuery, useUpdateEventMutation } from "../../slices/app/eventsApiSlice"
import { useNavigate, useParams } from "react-router-dom";
import styleUpdateEvent from './update-event.module.css'

interface CreateEventState {
  event: Array<{}>;
}

const UpdateEvent = () => {
  const [isOpenModal, openModal, closeModal] = useDatesModal(false);
  const [updateEvent] = useUpdateEventMutation();
  const dispatch: AppDispatch = useDispatch();
  const { eventId } = useParams();
  const { data: eventInfo } = useGetEventQuery({ id: eventId as string | '1' })

  const navigate = useNavigate()

  const locations: Array<Location> = useSelector(
    (state: State) => state.global.locations,
  );
  const categories: Array<Category> = useSelector(
    (state: State) => state.global.categories,
  );


  useEffect(() => {
    dispatch(getLocations());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if(eventInfo){
      console.log(eventInfo)
      let mappedCategoriesIds = eventInfo?.categories?.map((c: any) => c.id)
      // let mappedLocations = eventInfo?.locations?.map((loc: any) => ({
      //   id: loc.id,
      //   dates: loc.dates
      // }))
  
      // console.log({ mappedLocations })
      if (Object.keys(eventInfo).length > 1){
        setInput({
          name: eventInfo?.name || '',
          description: eventInfo?.description || '',
          background_image: eventInfo?.background_image || '',
          locations: eventInfo?.locations[0]?.id || '',
          categories: mappedCategoriesIds || [],
          dates: eventInfo?.locations[0].dates || []
        })
      } else navigate('/')
    }
  }, [eventInfo])

  const [event, setEvent] = useState<CreateEventState['event']>([]);

  const [
    input,
    handleInputChange,
    setInput,
    handleCategoryChange,
    handleLocationChange,
    inputDate,
    setInputDate,
    handleInputDateChange,
  ] = useCreateEvent({
    name: '',
    description: '',
    background_image: '',
    locations: '',
    categories: [],
    dates: [],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // dispatch(postCreateEvent(input));
    try {
      eventId && await updateEvent({id: eventId ,updatedEvent: input })
      setEvent([...event, input]);
      setInput({
        name: '',
        description: '',
        background_image: '',
        locations: '',
        categories: [],
        dates: [],
      });
      navigate('/')
    } catch (error) { console.log(error) }
  };

  const addDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput({ ...input, dates: [...input.dates, inputDate] });
    setInputDate({ price: 0, date: '' });
    closeModal();
  };

  const getLocationFormatted = (locId: number) => {
    const loc = locations?.find((loc) => loc?.id === input.locations)
    return `-${loc?.id}, ${loc?.address}, ${loc?.name}, ${loc?.city['name']}.`
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div className={styleUpdateEvent.form_update}>
        <fieldset className={styleUpdateEvent.fieldset_update}>
          {/* <label htmlFor="name">Nombre del evento:</label> */}
          <legend className={styleUpdateEvent.legend_update}>Nombre del evento:</legend>
          <input
            name="name"
            type="text"
            id="name"
            placeholder="Nombre del evento"
            className={styleUpdateEvent.input_update}
            onChange={handleInputChange}
            value={input.name}
          />
        </fieldset>  <br />
        <fieldset className={styleUpdateEvent.fieldset_update}>
          {/* <label htmlFor="description">Descripcion:</label> */}
          <legend className={styleUpdateEvent.legend_update}>Descripcion:</legend>
          <textarea
            name="description"
            id="description"
            placeholder="Descripcion..."
            className={styleUpdateEvent.input_update}
            onChange={handleInputChange}
            value={input.description}
          />
        </fieldset>  <br />
        <fieldset className={styleUpdateEvent.fieldset_update}>
          {/* <label htmlFor="background_image">Imagen:</label> */}
          <legend className={styleUpdateEvent.legend_update}>Imagen:</legend>
          <input
            name="background_image"
            type="text"
            id="background_image"
            placeholder="Imagen..."
            className={styleUpdateEvent.input_update}
            onChange={handleInputChange}
            value={input.background_image}
          />
        </fieldset>  <br />
        <fieldset className={styleUpdateEvent.fieldset_update}>
          <legend className={styleUpdateEvent.legend_update}>Seleccione la ciudad:</legend>
          <select
            name="locations"
            id="locations"
            className={styleUpdateEvent.form_cities_update}
            onChange={handleLocationChange}
            defaultValue={"default"}
          >
            <option value="default" disabled>{input.locations ? getLocationFormatted(input.locations) : `Seleccione la ciudad...`}</option>
            {locations?.map((location: Location) => {
              return (
                <option key={location.id} value={location.id} className={styleUpdateEvent.form_citie_update}>
                  {`-${location.id}, ${location.address}, ${location.name}, ${location.city['name']}.`}
                </option>
              );
            })}
          </select>
        </fieldset>  <br />

        <fieldset className={styleUpdateEvent.fieldset_update}>
          {/* <label htmlFor="categories">Seleccione las categorias...</label> */}
          <legend className={styleUpdateEvent.legend_update}>Seleccione las categorias:</legend>
          {categories?.map((category: Category) => {
            return (
              <React.Fragment key={category.id}>
                <br />
                <input
                  value={category.id}
                  type="checkbox"
                  checked={input.categories.includes(category.id)}
                  onChange={handleCategoryChange}
                />
                <span>{` ${category.id} ${category.name}`}.</span>
              </React.Fragment>
            );
          })}
        </fieldset>  <br />

        <fieldset className={styleUpdateEvent.fieldset_update}>
          <legend className={styleUpdateEvent.legend_update}>Seleccione Fecha:</legend>
          <button onClick={openModal} type="button" className={styleUpdateEvent.text_from_update}>
            Agregar fechas
          </button>
          <DatesModal isOpen={isOpenModal} closeModal={closeModal}>
            <h3>Agregar fechas.</h3>

            <input
              name="price"
              type="number"
              id="price"
              onChange={handleInputDateChange}
              value={inputDate.price}
            />
            <input
              name="date"
              type="date"
              id="date"
              onChange={handleInputDateChange}
              value={inputDate.date}
            />

            <button onClick={(e: any) => addDate(e)}>+</button>
          </DatesModal>

          {input.dates?.map((date: any) => {
            return (
              <React.Fragment key={date.date}>
                <h5>$: {date.price}</h5>
                <h5>Fecha: {date.date}</h5>
              </React.Fragment>
            );
          })}
        </fieldset>  <br />
        <button type="submit" className={styleUpdateEvent.bottom_form_update}>Actualizar Evento</button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default UpdateEvent;

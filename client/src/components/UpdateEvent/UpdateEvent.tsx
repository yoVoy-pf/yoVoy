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
    let mappedCategoriesIds = eventInfo?.categories?.map((c: any) => c.id)
    // let mappedLocations = eventInfo?.locations?.map((loc: any) => ({
    //   id: loc.id,
    //   dates: loc.dates
    // }))

    // console.log({ mappedLocations })
    setInput({
      name: eventInfo?.name || '',
      description: eventInfo?.description || '',
      background_image: eventInfo?.background_image || '',
      locations: eventInfo?.locations[0].id || '',
      categories: mappedCategoriesIds || [],
      dates: eventInfo?.locations[0].dates || []
    })
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
  console.log(input)

  const getLocationFormatted = (locId: number) => {
    const loc = locations?.find((loc) => loc?.id === input.locations)
    return `-${loc?.id}, ${loc?.address}, ${loc?.name}, ${loc?.city['name']}.`
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="name">Nombre del evento:</label>
          <input
            name="name"
            type="text"
            id="name"
            placeholder="Nombre del evento"
            onChange={handleInputChange}
            value={input.name}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="description">Descripcion:</label>
          <textarea
            name="description"
            id="description"
            placeholder="Descripcion..."
            onChange={handleInputChange}
            value={input.description}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="background_image">Imagen:</label>
          <input
            name="background_image"
            type="text"
            id="background_image"
            placeholder="Imagen..."
            onChange={handleInputChange}
            value={input.background_image}
          />
        </fieldset>
        <fieldset>
          <select
            name="locations"
            id="locations"
            onChange={handleLocationChange}
            defaultValue={"default"}
          >
            <option value="default" disabled>{input.locations ? getLocationFormatted(input.locations) : `Seleccione la ciudad...`}</option>
            {locations?.map((location: Location) => {
              return (
                <option key={location.id} value={location.id} >
                  {`-${location.id}, ${location.address}, ${location.name}, ${location.city['name']}.`}
                </option>
              );
            })}
          </select>
        </fieldset>

        <fieldset>
          <label htmlFor="categories">Seleccione las categorias...</label>
          {categories?.map((category: Category) => {
            return (
              <React.Fragment key={category.id}>
                <input
                  value={category.id}
                  type="checkbox"
                  checked={input.categories.includes(category.id)}
                  onChange={handleCategoryChange}
                />
                <span>{`-${category.id}, ${category.name}`}.</span>
              </React.Fragment>
            );
          })}
        </fieldset>

        <fieldset>
          <button onClick={openModal} type="button">
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
        </fieldset>
        <button type="submit">Create</button>
      </form>
    </React.Fragment>
  );
};

export default UpdateEvent;

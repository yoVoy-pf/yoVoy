import React, { useEffect, useState, useRef } from 'react';
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
  const locSelect = useRef<any>()
  const [isOpen, openModal, closeModal] = useDatesModal(false);
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
      if (!(Object.keys(eventInfo).length > 1)) navigate ('/')
      else handleUpdateFetch(eventInfo)
    }
  }, [eventInfo])

  const [
    input,
    resetState,
    handleInputChange,
    handleInputDateChange,
    currentDate,
    currentLocId,
    locsAux,
    isAlreadyAdded,
    handleAddDate,
    handleCategoryChange,
    handleLocationChange,
    handleConfirm,
    locsForSubmit,
    handleRemoveLoc,
    setInput,
    handleUpdateFetch
  ] = useCreateEvent({locations});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const event ={
      ...input,
      locations: locsForSubmit
    }
    try {
      eventId && await updateEvent({id: eventId ,updatedEvent: event })
      resetState();
      navigate(`/events/${eventInfo.id}`)
    } catch (error) { console.log(error) }
  };


  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div className={styleUpdateEvent.form_order}>
          <fieldset className={styleUpdateEvent.fieldset_form}>
            {/* <label htmlFor="name">Nombre del evento:</label> */}
            <legend className={styleUpdateEvent.legend_form}>
              Nombre del evento:
            </legend>
            <input
              name="name"
              type="text"
              id="name"
              placeholder="Nombre del evento"
              className={styleUpdateEvent.input_create}
              onChange={handleInputChange}
              value={input.name}
            />
          </fieldset>{' '}
          <br />
          <fieldset className={styleUpdateEvent.fieldset_form}>
            {/* <label htmlFor="description">Descripcion:</label> */}
            <legend className={styleUpdateEvent.legend_form}>
              Descripcion:
            </legend>
            <textarea
              name="description"
              id="description"
              placeholder="Descripcion..."
              className={styleUpdateEvent.input_create}
              onChange={handleInputChange}
              value={input.description}
            />
          </fieldset>{' '}
          <br />
          <fieldset className={styleUpdateEvent.fieldset_form}>
            {/* <label htmlFor="background_image">Imagen:</label> */}
            <legend className={styleUpdateEvent.legend_form}>Imagen:</legend>
            <input
              name="background_image"
              type="text"
              id="background_image"
              placeholder="Imagen..."
              className={styleUpdateEvent.input_create}
              onChange={handleInputChange}
              value={input.background_image}
            />
          </fieldset>{' '}
          <br />
          <fieldset className={styleUpdateEvent.fieldset_form}>
            <legend className={styleUpdateEvent.legend_form}>
              Seleccione las categorias:
            </legend>
            {categories?.map((category: Category) => {
              return (
                <React.Fragment key={category.id}>
                  <br />
                  <input
                    value={category.id}
                    type="checkbox"
                    onChange={handleCategoryChange}
                  />
                  <span>{` ${category.id}  ${category.name}`}.</span>
                </React.Fragment>
              );
            })}
          </fieldset>{' '}
          <fieldset className={styleUpdateEvent.fieldset_form}>
            <legend className={styleUpdateEvent.legend_form}>
              Localidades agregadas:
            </legend>
            {
              locsForSubmit.length > 0
                ? locsForSubmit
                  .map((loc: any) => {
                    let locData = locations.find((location) => location.id === parseInt(loc.id));
                    return locData ?
                      (
                        <div>
                          <span>{` ${locData.name} `}</span>
                          <span>{` ${locData.address} `}</span>
                          <button onClick={(e) => handleRemoveLoc(e, loc.id)}>X</button>
                          <ul>
                            {loc.dates.map((date: any) => (
                              <li key={date.date}>{`$${date.price} || ${date.date}`}</li>
                            ))}
                          </ul>
                        </div>
                      )
                      : null
                  })
                : <h1>No hay localidades cargadas para el evento</h1>
            }
          </fieldset>{' '}
          <br />
          {/* MODAL */}
          <fieldset className={styleUpdateEvent.fieldset_form}>
            <legend className={styleUpdateEvent.legend_form}>
              Agrege detalles de el/los eventos
            </legend>
            <button
              onClick={() => openModal()}
              type="button"
              className={styleUpdateEvent.text_from}
            >
              +
            </button>
            <DatesModal
              isOpen={isOpen}
              closeModal={closeModal}
              className={styleUpdateEvent.form_dates_modal}
            >
              <select
                name="id"
                ref={locSelect}
                placeholder="Seleccione un lugar"
                className={styleUpdateEvent.form_cities}
                onChange={handleLocationChange}
              >
                <option value="default">Seleccione la ciudad...</option>
                {locations?.map((location: Location) => {
                  return (
                    <option
                      key={location.id}
                      value={location.id}
                      className={styleUpdateEvent.form_citie}
                      disabled={isAlreadyAdded(location.id)}
                    >
                      {`-${location.id}, ${location.address}, ${location.name}, ${location.city['name']}.`}
                    </option>
                  );
                })}
              </select>
              <div>
                <input
                  name="price"
                  type="number"
                  value={currentDate?.price || '0'}
                  placeholder="Indique el precio..."
                  onChange={handleInputDateChange}
                />
                <input type="date" name="date" onChange={handleInputDateChange} />
                <button type="button" onClick={handleAddDate}>
                  +
                </button>
              </div>

              <div>
                {locsAux[currentLocId]?.dates?.map((date: any) => {
                  console.log(date)
                  return (
                    <fieldset className={styleUpdateEvent.legend_form}>
                      <ul>
                        <li key={`${date.price} - ${date.date}`}>
                          <React.Fragment>
                            <p>{`Precio: ${date.price}`} </p>
                            <p>{`Fecha: ${date.date}`} </p>
                          </React.Fragment>
                        </li>
                      </ul>
                      <React.Fragment>
                        <button type="button" key={date.id}>X</button>
                      </React.Fragment>
                    </fieldset>
                  );
                })}
              </div>
              <br />
              <button type="button" onClick={(e) => {
                let select = locSelect.current
                select.value = 'default'
                handleConfirm(e)
                closeModal()
              }}>
                Confirmar
              </button>
            </DatesModal>
          </fieldset>{' '}
          {/* EN MODAL */}
          <button type="submit" className={styleUpdateEvent.bottom_form}>
            Create
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default UpdateEvent;

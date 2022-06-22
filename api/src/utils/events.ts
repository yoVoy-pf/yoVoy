import { sequelize } from '../db'
import { Op } from "sequelize";
const { Event, Organization, Date, Category, Location } = sequelize.models
import utils from './event'
import makeDate, { dateParse, getNextDaysByMount, isTheNextDaysChecker } from './makeDate';

const attributes = ["id", "name", "background_image", "description"]

//trae todos los eventos de la base de datos
export async function getEventsFromDb() {
    const events = await Event.findAll({ attributes: attributes })
    return events
}

//trae los eventos de la base de datos que conincidan con la busqueda del searchBar.
export async function getEventsFromDbBySearch(search: string) {
    const eventsSearched = await Event.findAll(
        {
            attributes: attributes,
            where: {
                name: {
                    [Op.iLike]: `%${search}%`
                }
            }
        }
    )

    return eventsSearched
}

//trae los eventos correspondiente a una fecha, recibe la fecha a buscar y un array con ids de eventos
//para poder buscar los eventos uno por uno y chequear si pertenecen a la fecha.
export async function getEventsFromDbByDate(date: string, EventsIds:any) {
    let eventsByDate: any = [], i = 0;
    while (i < EventsIds.length) { 
        let event: any = await utils.getEventById(EventsIds[i])
        event.locations?.forEach((location: any) => {
            location.dates.forEach((d: any) => {
                if (makeDate(d.date) === makeDate(date)) {
                    eventsByDate.push(event)
                }
            })
        })
        i++
    }
    return eventsByDate
}

//trae los eventos si se encuentran dentro de los siguientes dias indicados, recibe los siguientes dias y un array con ids de eventos
//para poder buscar los eventos uno por uno y chequear si pertenecen en los siguienten dias indicados.
export async function getEventsFromDbByNextDate(nextDays: number, EventsIds:any) {
    let eventsByDate: any = [], i = 0;
    while (i < EventsIds.length) { 
        let event: any = await utils.getEventById(EventsIds[i])
        event.locations?.forEach((location: any) => {
            location.dates.forEach((d: any) => {
                if (isTheNextDaysChecker(nextDays, d.date)) {
                    eventsByDate.push(event)
                }
            })
        })
        i++
    }
    return eventsByDate
}

//trae los eventos filtrados por categoria y locacion.
export async function getEventsFromDbByFilter(category?: string, location?: string, organization?: string, city?: string, date?: string, nextDays?:string) {
    let options: any = { include: [] }

    if (organization) {
        options.include.push({
            model: Organization,
            where: { id: organization },
            attributes: []
        })
    }
    if (city) {
        options.include.push({
            model: Location,
            where: { cityId: city },
            attributes: []
        })
    }
    if (category) {
        options.include.push({
            model: Category,
            where: { id: category },
            attributes: []
        })
    }
    if (location && !city) {
        options.include.push({
            model: Location,
            where: { id: location },
            attributes: []
        })
    }

    options.attributes = attributes
    const events = await Event.findAll(options)

    if (date) {
        const EventsIds: any = []
        events.forEach((e: any) => { EventsIds.push(e.id) })
        return getEventsFromDbByDate(date, EventsIds)
    }else if (nextDays) {
        const EventsIds: any = []
        events.forEach((e: any) => { EventsIds.push(e.id) })
        return getEventsFromDbByNextDate(Number(nextDays), EventsIds)
    }

    return events
}

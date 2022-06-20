import { sequelize } from '../db'
import { Op } from "sequelize";
const { Event, Organization, Date, Category, Location } = sequelize.models
import utils from './event'

const attributes = ["id","name","background_image", "description"]

//trae todos los eventos de la base de datos
export async function getEventsFromDb() {
    const events = await Event.findAll({attributes: attributes})
    return events
}

//trae los eventos de la base de datos que conincidan con la busqueda del searchBar.
export async function getEventsFromDbBySearch(search: string) {
    const eventsSearched = await Event.findAll(
       { attributes: attributes,
        where: {
        name: {
            [Op.iLike] : `%${search}%`
        }
       }
    }
    )

    return eventsSearched
}

export async function getEventsFromDbByDate(events: any, date: string) {
    let eventsByDate: any = [], i = 1;
    while (i <= events) {
        let event: any = await utils.getEventById(i.toString())
        event.locations?.forEach((location: any) => {
            location.dates.forEach((d: any) => {
                if (d.date === date) {
                    eventsByDate.push(event)
                }
            })
        })
        i++
    }
    return eventsByDate


}

//trae los eventos filtrados por categoria y locacion.
export async function getEventsFromDbByFilter(category?: string, location?: string, organization?: string, city?: string, date?: string){
    let options: any = {include: []}

    if(organization){
       options.include.push({
        model: Organization,
        where: {id: organization},
        attributes: []
       })
    }
    if(city){
        options.include.push({
            model: Location,
            where: {cityId: city},
            attributes: []
        })
    }
    if(category){
        options.include.push({
            model: Category,
            where: {id: category},
            attributes: []
        })
    }
    if(location && !city){
        options.include.push({
            model: Location,
            where: {id: location},
            attributes: []
        })
    }

    options.attributes = attributes
    const events = await Event.findAll(options)

    if(date){
        return getEventsFromDbByDate(events.length, date)
    }
   
    return events
}

import { sequelize } from '../db'
import { Op } from "sequelize";
const { Event, Organization, Date, Category, Location } = sequelize.models

//trae todos los eventos de la base de datos
export async function getEventsFromDb() {
    const events = await Event.findAll()
    return events
}

//trae los eventos de la base de datos que conincidan con la busqueda del searchBar.
export async function getEventsFromDbBySearch(search: string) {
    const eventsSearched = await Event.findAll(
       { where: {
        name: {
            [Op.iLike] : `%${search}%`
        }
       }
    }
    )

    return eventsSearched
}

//trae los eventos filtrados por categoria y locacion.
export async function getEventsFromDbByFilter(category?: string, location?: string, organization?: string, city?: string){
    let options: any = {include: []}

    if(organization){
       options.include.push({
        model: Organization,
        where: {id: organization}
       })
    }
    if(city){
        options.include.push({
            model: Location,
            where: {cityId: city}
        })
    }
    if(category){
        options.include.push({
            model: Category,
            where: {id: category}
        })
    }
    if(location && !city){
        options.include.push({
            model: Location,
            where: {id: location}
        })
    }
    const events = await Event.findAll(options)
   
    return events
}
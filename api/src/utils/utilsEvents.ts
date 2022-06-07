import { sequelize } from '../db'
import { Op } from "sequelize";
const { Event, Organization, Date } = sequelize.models

//trae todos los eventos de la base de datos
export async function getEventsFromDb() {
    const events = await Event.findAll()
    return events
}

//trae los eventos de la base de datos que conincidan con la busqueda del searchBar. SE DEBE PROBAR
export async function getEventsFromDbBySearch(search: string) {
    const eventsSearched = await Event.findAll(
       { where: {
        name: {
            [Op.like] : `%${search}%`
        }
       }
    }
    )
    return eventsSearched
}

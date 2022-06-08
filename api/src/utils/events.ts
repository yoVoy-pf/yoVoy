import { sequelize } from '../db'
import { Op } from "sequelize";
const { Event, Organization, Date, Category } = sequelize.models

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

export async function getEventsFromDbByFilter(filter: string){
    const events = await Event.findAll({
        include:{
            model:Category,
            where:{
                name: filter
            },
            through: {
                attributes: []
            },
            attributes: ["id", "name"]
        }
    })

    return events
}
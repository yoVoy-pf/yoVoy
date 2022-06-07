import { sequelize } from '../db'
import { Op } from "sequelize";
const { Event, Organization, Date } = sequelize.models


export async function getEventsFromDb() {
    const events = await Event.findAll()
    return events
}


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

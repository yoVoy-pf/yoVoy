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

export async function getEventsFromDbByFilter(category?: string, location?: string){
    let options: any = {include: []}

    if(category){
        options.include.push({
            model: Category,
            where: {id: category}
        })
    }
    if(location){
        options.include.push({
            model: Location,
            where: {id: location}
        })
    }
    const events = await Event.findAll(options)
    /*const events = await Event.findAll({include:[Category,Location]})
    const filterEvents = events.filter(e=>{
        let c = e.getDataValue("categories")[0].getDataValue("name")
        let l = e.getDataValue("locations")[0].getDataValue("name")
        if(category && location){
            return c === category && l === location
        }else if(category){
            return c === category
        } else if(location){
            return l === location
        }
    })
    console.log(filterEvents)*/
    return events
}
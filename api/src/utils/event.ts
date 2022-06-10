import { sequelize } from "../db";
import { iEvent } from "../types/event";
import { Model } from "sequelize-typescript";

const {Event, Category, Date, Location, Organization, EventLocation, City, EventCategory} = sequelize.models

export default {

    getEventById: async (id: string): Promise<iEvent> => {
        const event = await Event.findByPk(id,
            { 
            attributes: ["id", "name", "description", "background_image"],
            include: [
                {     
                    model: Organization,
                    attributes: ["id", "name"]
                },
                {
                    model: Location,
                    attributes: ["id", "name", "map", "address"],
                    include: [
                        {
                            model: City,
                            attributes: ["id","name"]
                        },
                        {
                            model: EventLocation,
                            attributes: ["id"],
                            where:{
                                eventId: id
                            },
                            include: [
                                {
                                model: Date,
                                attributes:["id", "date","price"]
                                }
                        ]   
                        }
                    ],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Category,
                    attributes: ["id","name"],
                    through: {
                        attributes: []
                    }
                }
            ]
        })
        return {
            id: event?.getDataValue("id"),
            name: event?.getDataValue("name"),
            background_image: event?.getDataValue("background_image"),
            description: event?.getDataValue("description"),
            locations: event?.getDataValue("locations").map((location: Model<any>) => {
                return {
                    id: location.getDataValue("id"),
                    name: location.getDataValue("name"),
                    address: location.getDataValue("address"),
                    map: location.getDataValue("map"),
                    city: {
                        id: location.getDataValue("city").getDataValue("id"),
                        name: location.getDataValue("city").getDataValue("name")
                    },
                    dates: location.getDataValue("events_dates")[0]
                    .getDataValue("dates").map((date: Model<any>) => {
                            return {
                                id: date.getDataValue("id"),
                                price: date.getDataValue("price"),
                                date: date.getDataValue("date")
                            }
                        })
                    ,
                    
                }
            }),
            organization: {
                id: event?.getDataValue("organization").getDataValue("id"),
                name: event?.getDataValue("organization").getDataValue("name"),
            },
            categories: event?.getDataValue("categories").map((category: Model<any>) => {
                return {
                    id: category.getDataValue("id"),
                    name: category.getDataValue("name")
                }
            })
        }
    },
    
    createEvent: async ({
        name,
        description,
        background_image,
        organizationId,
        categoryIds,
        locationId,
        dates // {price,date}
    }: any) => {
        let event = await Event.create({name, description, background_image, organizationId})
        let eventId = event.getDataValue("id")
        categoryIds.forEach( async (id:number) => {
            await EventCategory.create({eventId, categoryId: id})
        });

        let eventLocation = await EventLocation.create({eventId, locationId})
        let eventLocationId = eventLocation.getDataValue("id")

        dates = dates.map((date:any) => {
            return {...date, eventLocationId}
        })

        await Date.bulkCreate(dates)

        return event
    },

    destroyEvent: async (id: string) => {
        let event = await Event.findOne({
            where: {id: id},
            attributes: ["id"],
            include: [
                {
                    model: EventLocation,
                    include: [
                        {
                            model: Date,
                            attributes: ["id"]
                        }
                    ]
                }
            ]
        })

        event?.getDataValue("locations_m").forEach((l: Model<any>) => {
            l.getDataValue("dates").forEach(async (d: Model<any>) => {
                await Date.destroy({where:{id: d.getDataValue("id")}})
            })
        })

        event?.destroy()

    }
}
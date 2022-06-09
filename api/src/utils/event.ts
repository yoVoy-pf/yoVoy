import { sequelize } from "../db";

const {Event, Category, Date, Location, Organization, EventLocation, City, EventCategory} = sequelize.models

export default {

    getEventById: async (id: string) => {
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
        return event
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
    }

}
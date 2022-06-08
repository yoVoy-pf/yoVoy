import { sequelize } from "../db";

const {Event, Category, Date, Location, Organization} = sequelize.models

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
                    model: Date,
                    include: [{
                        model: Location,
                        attributes: ["id","name","address"]
                    }],
                    attributes: ["id", "price", "date"],
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
    } 

}
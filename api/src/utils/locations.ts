import { sequelize } from "../db"

const { Location, City } = sequelize.models

export const getAllLocations = async () => {
    const locations = await Location.findAll({
        attributes:["id","name","address","map"],
        include:{
            model: City,
            attributes:["id","name"]
        }
    })

    return locations
}


export const getAllLocationsByCity = async (id: number) => {
    const locations = await Location.findAll({
        where:{
            cityId: id
        },
        attributes:["id","name","address","map"],
        include:{
            model: City,
            attributes:["id","name"]
        }
    })

    return locations
}
import { sequelize } from "../db"

const { Location, City } = sequelize.models

export const findLocation = async(id: string | number) => {
    const location = await Location.findByPk(id,{
        include:{
            model: City,
            attributes: ["id", "name"]
        }
    })

    return location
}

export const createLocation = async({name, latitude, length, address, cityId}:any) => {
    const location = await Location.create({name, latitude, length, address, cityId})

    return location
}

export const updateLocation = async(id:string| number, {name,map,address,cityId}:any) => {
    await Location.update({name,address,map,cityId}, {where: {id}})
}
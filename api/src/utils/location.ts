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

export const createLocation = async({name, map, address, cityId}:any) => {
    const location = await Location.create({name, map, address, cityId})

    return location
}

export const updateLocation = async(id:string| number, {updateLocation}:any) => {
    await Location.update({name: updateLocation.name, map: updateLocation.map , address: updateLocation.address, cityId: updateLocation.cityId}, {where: {id}})
}
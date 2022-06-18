import { sequelize } from "../db";
import { Op } from "sequelize"

const { User, Event, Favorites, Ticket, UserRole } = sequelize.models

export const getAllFavorites = async(id:string | number) => {
    const favorites = await Event.findAll({
        attributes: ["id","background_image", "name",],
        include:{
            model:User,
            attributes: [],
            where: {
                id: id
            }
        }
    })

    return favorites
}

export const createFavorite = async(id:string | number, eventId:string) => {
    const favorite = await Favorites.create({userId: id, eventId})

    return favorite
}

export const destroyFavorite = async(id:string | number, eventId:string) => {
    const favorite = await Favorites.destroy({
        where:{
            userId: id,
            eventId
        }
    })

    return favorite
}

export const getAllTickets = async(id: string | number) => {
    const tickets = await Ticket.findAll({
        attributes: ["paymentId","status","status_detail","paymentType","transaction_amount","quantity"],
        where:{
            userId: id
        },
        include:{
            model: Event,
            attributes: ["id","name"]
        }
    })

    return tickets
}

export const updateUserRole = async(userId: string | number, roleId: string | number) => {
    await UserRole.destroy({
        where:{
            userId,
            roleId: {
                [Op.or]: [3030, 2020]
            }
        }
    })

    if(roleId == 1010) return "Role eliminated succesfully"

    let bulk = [{userId, roleId}]
    
    if(roleId == 3030){
        const haveOrganizationRole = await UserRole.count({
            where:{
                userId,
                roleId: 2020
            }
        })

        if(!haveOrganizationRole) bulk.push({userId, roleId: 2020})
    }

    const roles = await UserRole.bulkCreate(bulk)

    return roles
}


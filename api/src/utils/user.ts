import { sequelize } from "../db";

const { User, Event, Favorites } = sequelize.models

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


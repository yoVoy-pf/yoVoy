import { sequelize } from '../db'
const {Comments} = sequelize.models

export const getAllCommentsByEvent = async (id: string | number) => {
    const comments = await Comments.findAll({
        where:{
            eventId: id
        }
    })

    return comments
}
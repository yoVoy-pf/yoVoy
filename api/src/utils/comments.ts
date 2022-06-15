import { sequelize } from '../db'
const {Comment} = sequelize.models

export const getAllCommentsByEvent = async (id: string | number) => {
    const comments = await Comment.findAll({
        where:{
            eventId: id
        }
    })

    return comments
}
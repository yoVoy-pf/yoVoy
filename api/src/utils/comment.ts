import { sequelize } from '../db'
const { Comments } = sequelize.models

export const createComment = async (id: string | number, user: any,text: string) => {
    const comment = await Comments.create({eventId: id, userId: user.id, text})

    return comment
}
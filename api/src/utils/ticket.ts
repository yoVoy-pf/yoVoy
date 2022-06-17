import { sequelize } from "../db";

const { Ticket } = sequelize.models

export const getTicketFromDb = async (id: string | number) => {
    const ticket = await Ticket.findByPk(id)

    return ticket
}
import { sequelize } from "../db";

const { Ticket } = sequelize.models

export const getAllTickets = async () => {
    const tickets = await Ticket.findAll()

    return tickets
}

export const createTickets = async(preferenceId: string, items: any, user: any) => {

    items.forEach((item: any) => {
        Ticket.create({
            preferenceId,
            status: "processing",
            transaction_amount: item.unit_price * item.quantity,
            quantity: item.quantity,
            userId: user.id,
            eventId: item.id
        })
    })
}
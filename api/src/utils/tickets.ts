import { sequelize } from "../db";
import { Op } from "sequelize"
const { Ticket, User, Event} = sequelize.models

export const getAllTickets = async (status: string, name:string, paginate:any) => {
    let options: any = {
        where:{},
        include: [{
        model: User,
        attributes: ["id", "name"],
        where: {}
    },{
        model: Event,
        attributes: ["id", "name"]
    }]
} 

    if(paginate){
        options.limit = paginate.limit
        options.offset = paginate.offset
    }
    if(status) options.where.status= status
    if(name) options.include[0].where.name = {[Op.iLike]: `${name}%`}

    const tickets = await Ticket.findAndCountAll(options)

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
            eventId: item.id,
            date: item.date,
            location: item.location
        })
    })
}
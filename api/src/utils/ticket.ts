import mercadopago from "mercadopago";
import { sequelize } from "../db";
import config from "../../config";

const { Ticket } = sequelize.models

export const getTicketFromDb = async (id: string | number) => {
    const ticket = await Ticket.findByPk(id)

    return ticket
}

export const updateTicket = async(preferenceId: string, paymentId: string) => {
    mercadopago.configure({
        access_token: config.ACCESS_TOKEN
    })

    const {body}  = await mercadopago.payment.findById(Number(paymentId))

    await Ticket.update({status: body.status , status_detail: body.status_detail , paymentId , paymentType: body.payment_type_id},{
        where:{
            preferenceId
        }
    })
}
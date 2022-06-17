import mercadopago from "mercadopago"
import config from "../../config"
import { sequelize } from "../db"

const { Ticket } = sequelize.models

export const createPreference= (items:any, user: any) => {

    mercadopago.configure({
        access_token: config.ACCESS_TOKEN
    })

    const preference = mercadopago.preferences.create({
        payer:{
            name: user.name,
            surname: user.surname || "",
            email: user.email || "test@userTest.com",
            identification:{
                type: "DNI",
                number: user.DNI || "12345678"
            }
        },
        items,
        back_urls:{
            success: "http://localhost:3001/api/process-payment/update",
            failure: "http://localhost:3001/api/process-payment/update",
            pending: "http://localhost:3001/api/process-payment/update"
        }
    })

    return preference
}


export const updatePaymentById = async(preferenceId: string, paymentId: string) => {
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
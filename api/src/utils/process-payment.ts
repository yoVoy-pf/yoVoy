import e from "express"
import mercadopago from "mercadopago"
import config from "../../config"
import { sequelize } from "../db"
const nodemailer = require('nodemailer')

const { Ticket, User } = sequelize.models

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
            success: `${config.API_HOST}/api/process-payment/update`,
            failure: `${config.API_HOST}/api/process-payment/update`,
            pending: `${config.API_HOST}/api/process-payment/update`,
        }
    })

    return preference
}


export const updatePaymentById = async(preferenceId: string, paymentId: string) => {
    mercadopago.configure({
        access_token: config.ACCESS_TOKEN
    })

    const {body}  = await mercadopago.payment.findById(Number(paymentId))

    let ticket = await Ticket.findOne({
      include:{
        model: User,
        attributes: ["email"]
      },
      where:{
        preferenceId
      }
    })

    ticket?.update({status: body.status , status_detail: body.status_detail , paymentId , paymentType: body.payment_type_id})

    let transporter = nodemailer.createTransport({
      host:'smtp.gmail.com',
      post: 587,
      secure: false,
      auth: {
        user: 'soporteyovoypf@gmail.com',
        pass: 'iefkyfxwlvdgitsp'
      }
    })

    const userMail = ticket?.getDataValue("user").getDataValue("email")

    let mailOptions = {
      from: 'soporteyovoypf@gmail.com',
      to: userMail,
      subject: 'Confirmación de tu pago en YoVoy',
      text: 'Hola, te confirmamos que tu pago en YoVoy se ha realizado correctamente. Te esperamos pronto para tu próxima visita.'
    }

    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if(error){
        return console.log(error)
      }else{
        console.log('Message sent: %s', info.messageId)
      }
    })
}
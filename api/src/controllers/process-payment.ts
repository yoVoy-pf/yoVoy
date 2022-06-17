import { Request, Response, NextFunction } from "express"
import { createPreference, updatePaymentById } from "../utils/process-payment"
import utils from "../utils/event"
import { createTickets } from "../utils/tickets"

export const process_payment = (req: Request,res: Response,next:NextFunction) => {
    try{
        const {user,list} = req.body

        Promise.all(list.map((item:any) => utils.getEventByDate(item.dateId)))
        .then((data) => {
            data = data.map((item: any, i: number) => {
                return {
                        id: String(item.getDataValue("id")),
                        title: item.getDataValue("name"),
                        currency_id: "ARS",
                        picture_url: item.getDataValue("background_image"),
                        description: item.getDataValue("description"),
                        category_id: "art",
                        quantity: list[i].quantity,
                        unit_price: item.getDataValue("locations_m")[0].getDataValue("dates")[0].getDataValue("price") 
                }
            })

            createPreference(data,user)
            .then((preference: any) => {
                createTickets(preference.body.id, data, user)
                res.status(200).json(preference.body.sandbox_init_point)
            })
        })

    }catch(error){
        next(error)
    }
}

export const updatePayment = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const preference_id = req.query.preference_id as string
        const payment_id = req.query.payment_id as string
        
        await updatePaymentById(preference_id, payment_id)

        res.redirect("http://localhost:3000")
    }catch(error){
        next(error)
    }
} 

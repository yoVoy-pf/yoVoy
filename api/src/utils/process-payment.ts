import mercadopago from "mercadopago"
import config from "../../config"

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
            success: "http://localhost:3000/",
            failure: "http://localhost:3000/",
            pending: "http://localhost:3000/"
        }
    })

    return preference
}
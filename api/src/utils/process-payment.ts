import mercadopago from "mercadopago"

export const createPreference= (items:any, user: any, organization:any) => {

    mercadopago.configure({
        access_token: organization.getDataValue("ACCESS_TOKEN"),
        client_id: organization.getDataValue("CLIENT_ID"),
        client_secret: organization.getDataValue("CLIENT_SECRET")
    })
    const preference = mercadopago.preferences.create({
        payer:{
            name: user.name,
            surname: user.surname,
            email: user.email,
            identification:{
                type: "DNI",
                number: user.DNI
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
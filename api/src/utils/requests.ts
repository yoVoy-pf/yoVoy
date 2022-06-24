import { sequelize } from "../db";
import { User } from "../models/User";

const { Requests } = sequelize.models

export const findAllRequests = async (paginate: any) => {
    let options: any = {
        attributes: ["id","status","description","type","method"],
        include: {
            model: User,
            attributes: ["id", "name", "email"]
        }
    }
    
    if(paginate){
        options.limit = paginate.limit
        options.offset = paginate.offset
    }
    const requests = await Requests.findAndCountAll(options)

    return requests
}
import { sequelize } from "../db";
import fs from "fs"
const { Request } = sequelize.models

export const createRequest = async (userId: number, description: string, type: string, method: string, information: any) => {

    const request  = await Request.create({userId, description, type, method})

    if (!fs.existsSync("./requests")){
        fs.mkdirSync("./requests");
    }

    const url_body = `./requests/${request.getDataValue("id")}-${method}-${type}-.json`

    fs.writeFile(url_body,JSON.stringify(information), "utf-8", (err) => {
        if(err) throw err;
    })

    request.update({url_body})
}
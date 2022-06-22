import { sequelize } from "../db";
import { Model } from "sequelize";
import fs from "fs"
const { Request } = sequelize.models

enum list{
    POST_organization = "createOrganization",
    POST_location = "createLocation",
    DELETE_event = "destroyEvent",
    PUT_event = "updateEvent"
}

export const createRequest = async (userId: number, description: string, type: string, method: string, information: any) => {
    const request  = await Request.create({userId, description, type, method, function_type: list[`${method}_${type}` as keyof typeof list]})
    
    if (!fs.existsSync("./requests")){
        fs.mkdirSync("./requests");
    }
    const id = request.getDataValue("id")
    const url_body = `./requests/${id}_${method}_${type}.json`

    fs.writeFile(url_body,JSON.stringify(information), "utf-8", (err) => {
        if(err) throw err;
    })

    request.update({url_body})
}

const executeRequest = (request: Model<any,any>) => {
    const id = request.getDataValue("id")
    const type = request.getDataValue("type")
    const method = request.getDataValue("method")
    const function_type = request.getDataValue("function_type")

    let body = fs.readFileSync(`./requests/${id}_${method}_${type}.json`, {encoding:'utf8', flag:'r'} )
    body = JSON.parse(body)
    
    require(`../utils/${type}.ts`)[function_type](body)
}

export const updateRequest = async (id:string | number, status: string) => {
    let request = await Request.findByPk(id)
    if(request){

        request.update({status})
        
        if(status === "accepted") executeRequest(request)
    }
}
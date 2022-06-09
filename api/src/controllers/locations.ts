import { Request, Response, NextFunction } from "express";
import { getAllLocations, getAllLocationsByCity } from "../utils/locations";

export const getLocations = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {city} = req.query
        let locations
        if(city){
            locations = await getAllLocationsByCity(Number(city))
        }else{
            locations = await getAllLocations()
        }
        
        res.status(200).json(locations)
    }catch(error){
        next(error)
    }
}
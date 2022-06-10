import { Request, Response, NextFunction } from "express"
import { getCitiesFromDb } from '../utils/cities'

export const getCities = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const cities = await getCitiesFromDb();
        res.status(200).send(cities)
    } catch (error) {
        res.status(400).send(error)
    }

}
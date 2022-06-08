import { Request, Response, NextFunction } from "express"
import {getCategoriesFromDb} from '../utils/categories'

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
     const categories = await getCategoriesFromDb()
     res.status(200).json(categories)
    } catch (error) {
        res.status(404).json(error)
    }

}
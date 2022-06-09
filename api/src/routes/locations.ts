import { Router } from "express"
import { getLocations } from "../controllers/locations"

export const router = Router()

router.get('/', getLocations)
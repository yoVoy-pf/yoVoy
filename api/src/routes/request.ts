import { Router } from "express"
import { postRequest } from "../controllers/request"
import { authenticateToken } from "../middlewares/authenticateToken"


export const router = Router()

router.post('/', authenticateToken, postRequest)
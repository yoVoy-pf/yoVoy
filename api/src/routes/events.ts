import { Router, Response, Request, NextFunction } from "express"
import {getEvents} from '../controllers/events'


export const router = Router()

router.get('/', getEvents)



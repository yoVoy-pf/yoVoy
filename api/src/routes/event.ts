import { Router } from "express";
import { getEventById, postEvent, deleteEvent } from "../controllers/event";
import { authenticateToken } from "../middlewares/authenticateToken";
import { verifyRoles } from "../middlewares/verifyRoles";
import { ROLES_LIST } from "../authorization/roles";



export const router = Router();

router.get("/:id", getEventById)
router.post("/",authenticateToken,verifyRoles(ROLES_LIST.Organization), postEvent)
router.delete("/:id", deleteEvent)
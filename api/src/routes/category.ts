import { Router } from "express";
import { ROLES_LIST } from "../authorization/roles";
import { postCategory } from "../controllers/category"
import { authenticateToken } from "../middlewares/authenticateToken";
import { verifyRoles } from "../middlewares/verifyRoles";

export const router = Router()

router.post("/",authenticateToken,verifyRoles(ROLES_LIST.Admin), postCategory)
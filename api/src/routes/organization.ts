import { Router } from "express";
import { postOrganization } from "../controllers/organization"
import { authenticateToken } from "../middlewares/authenticateToken";

export const router = Router();

router.post("/",authenticateToken, postOrganization)
import { Router } from "express";
import { getFavorites } from "../controllers/user"
import { authenticateToken } from "../middlewares/authenticateToken";


export const router = Router();

router.get("/favorites", authenticateToken, getFavorites)

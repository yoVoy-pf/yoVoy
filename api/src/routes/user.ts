import { Router } from "express";
import { getFavorites, postFavorite } from "../controllers/user"
import { authenticateToken } from "../middlewares/authenticateToken";


export const router = Router();

router.get("/favorites", authenticateToken, getFavorites)
router.post("/favorite/:eventId", authenticateToken, postFavorite)
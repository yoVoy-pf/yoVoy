import { Router } from "express";
import { ROLES_LIST } from "../authorization/roles";
import { getFavorites, postFavorite, getTickets, putUserRole } from "../controllers/user"
import { authenticateToken } from "../middlewares/authenticateToken";
import { verifyRoles } from "../middlewares/verifyRoles";


export const router = Router();

router.get("/favorites", authenticateToken, getFavorites)
router.post("/favorite/:eventId", authenticateToken, postFavorite)
router.get("/tickets",authenticateToken, getTickets)
router.put("/role", authenticateToken, verifyRoles(ROLES_LIST.Admin), putUserRole)
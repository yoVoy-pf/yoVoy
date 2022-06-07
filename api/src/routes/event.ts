import { Router } from "express";
import { getEventById } from "../controllers/event";

export const router = Router();

router.get("/:id", getEventById)

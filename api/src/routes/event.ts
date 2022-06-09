import { Router } from "express";
import { getEventById, postEvent } from "../controllers/event";

export const router = Router();

router.get("/:id", getEventById)
router.post("/", postEvent)

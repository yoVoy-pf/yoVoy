import { Router } from "express";
import { getCities } from "../controllers/cities";

export const router = Router();

router.get("/", getCities)
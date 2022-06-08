import { Router } from "express";
import { postCategory } from "../controllers/category"

export const router = Router()

router.post("/", postCategory)
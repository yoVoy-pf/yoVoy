import { Router } from "express";
import { postCategory } from "../controllers/category"

const router = Router()

router.post("/", postCategory)
import express from "express";
import {register , login , personalInfo} from "../controllers/user.controller.js";
const router = express.Router();
import { authMiddleware } from "../middlewares/authMiddleware.js";

router.post("/register" , register)
router.post("/login" , login)
router.get("/personal-info" , authMiddleware , personalInfo)
export default router

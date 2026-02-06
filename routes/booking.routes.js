import express from "express";
import {createBooking} from "../controllers/booking.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-booking" , authMiddleware , createBooking);

export default router
import express from "express";
import {createBooking , getAllBookings , getBookingById, updateBooking , deleteBooking} from "../controllers/booking.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-booking" , authMiddleware , createBooking);
router.get("/" , authMiddleware , getAllBookings);
router.get("/:id" , authMiddleware , getBookingById);
router.patch("/:id" , authMiddleware , updateBooking);
router.delete("/:id" , authMiddleware , deleteBooking);

export default router
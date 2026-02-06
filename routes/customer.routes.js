import express from "express";
import {createCustomer , deleteCustomer, getAllCustomers, updateCustomer} from "../controllers/customer.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-customer" , authMiddleware , createCustomer);

router.get("/" , authMiddleware , getAllCustomers);

router.patch("/:id" , authMiddleware , updateCustomer);

router.delete("/:id" , authMiddleware , deleteCustomer);
export default router

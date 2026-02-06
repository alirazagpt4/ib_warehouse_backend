import Booking from "../models/booking.model.js";
import crypto from "crypto";

export const createBooking = async (req , res) =>{

    const {customerId , description , weight , volume} = req.body;
    try {
        const randomstr = crypto.randomBytes(3).toString('hex').toUpperCase();
        const trackingId = `IB-${randomstr}`;

        if(!customerId || !description || !weight || !volume){
            return res.status(400).json({message: "All fields are required"});
        }

        const existingBooking = await Booking.findOne({
            where:{
                trackingId: trackingId
            }
        })
        if(existingBooking){
            return res.status(400).json({message: "Booking already exists"});
        }
        const booking = await Booking.create({
            trackingId,
            customerId,
            description,
            weight,
            volume,
            noOfCartons,
            hsCode,
            status:1
        });

        return res.status(201).json({message: "Booking created successfully" , booking});
        
    } catch (error) {
        console.error("Error creating booking:", error);
        return res.status(500).json({ message: "Failed to create booking" });
    }

}


import Booking from "../models/booking.model.js";
import crypto from "crypto";
import Customer from "../models/customer.model.js";
import { Op } from "sequelize";

export const createBooking = async (req, res) => {

    const { customerId, description, weight, volume, noOfCartons, hsCode } = req.body;
    try {
        const randomstr = crypto.randomBytes(3).toString('hex').toUpperCase();
        const trackingId = `IB-${randomstr}`;

        if (!customerId || !description || !weight || !volume) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingBooking = await Booking.findOne({
            where: {
                trackingId: trackingId
            }
        })
        if (existingBooking) {
            return res.status(400).json({ message: "Booking already exists" });
        }
        const booking = await Booking.create({
            trackingId,
            customerId,
            description,
            weight,
            volume,
            noOfCartons,
            hsCode,
            status: 1
        });

        return res.status(201).json({ message: "Booking created successfully", booking });

    } catch (error) {
        console.error("Error creating booking:", error);
        return res.status(500).json({ message: "Failed to create booking" });
    }

}



export const getAllBookings = async(req , res) =>{
    try {
        // 1. Pagination aur Search query params se nikaalna
        const {customerId} = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const offset = (page - 1) * limit;

        // 2. Search Filter Logic (Tracking ID ya Status ke liye ya customer id)
        const whereClause = {};

        if (search) {
            whereClause[Op.or] = [
                { trackingId: { [Op.like]: `%${search}%` } }
            ];
        }

        if(customerId){
            whereClause.customerId = customerId;
        }

        // 3. Database query with Join (Include Customer)
        const { count, rows } = await Booking.findAndCountAll({
            where: whereClause,
            include: [{
                model: Customer,
                as: 'customerDetail', // Wahi 'as' jo Associations.js mein rakha tha
                attributes: ['id', 'name', 'phone', 'brandName'] // Sirf zaroori info
            }],
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']] // Latest bookings upar aayengi
        });

        // 4. Response with Metadata
        return res.status(200).json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            bookings: rows
        });


    } catch (error) {
        console.log("Error fetching bookings:", error);
        return res.status(500).json({ 
            message: "Failed to get bookings", 
            error: error.message 
        });
    }

}


export const getBookingById = async(req , res) =>{
    try {
        const {id} = req.params;
        const booking = await Booking.findByPk(id , {
            include: [{
                model: Customer,
                as: 'customerDetail',
                attributes: ['id', 'name', 'phone', 'brandName']
            }]
        });
        if(!booking){
            return res.status(404).json({ message: "Booking not found" });
        }
        return res.status(200).json({ booking });
    } catch (error) {
        console.log("Error fetching booking:", error);
        return res.status(500).json({ 
            message: "Failed to get booking", 
            error: error.message 
        });
    }
}



export const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, weight, volume, noOfCartons, hsCode, status } = req.body;

        const booking = await Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Agar status update ho raha hai, toh check karein ke 1-9 ke darmiyan ho
        if (status && (status < 1 || status > 9)) {
            return res.status(400).json({ message: "Invalid status stage (Must be 1-9)" });
        }

        // Data update karein
        await booking.update({
            description: description || booking.description,
            weight: weight || booking.weight,
            volume: volume || booking.volume,
            noOfCartons: noOfCartons || booking.noOfCartons,
            hsCode: hsCode || booking.hsCode,
            status: status || booking.status
        });

        res.status(200).json({ message: "Booking updated successfully!", booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        await booking.destroy();
        res.status(200).json({ message: "Booking deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Public Tracking Function
export const trackBooking = async (req, res) => {
    try {
        const { trackingId } = req.params;

        const booking = await Booking.findOne({
            where: { trackingId: trackingId },
            include: [{
                model: Customer,
                as: 'customerDetail',
                attributes: ['name', 'brandName'] // Sirf zaroori data bhejein
            }]
        });

        if (!booking) {
            return res.status(404).json({ message: "Shipment not found" });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


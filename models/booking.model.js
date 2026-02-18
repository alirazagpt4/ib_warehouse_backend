import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Booking = sequelize.define("Booking", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    trackingId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'customers', 
            key: 'id'
        }
    },
    description: {
        type: DataTypes.TEXT, // Booking Description / Item
    },
    weight: {
        type: DataTypes.DECIMAL(10, 2), // Total item weight kgs
    },
    cbm: {
        type: DataTypes.DECIMAL(10, 3), // CBM = M3 (Cubic Meter)
    },
    rate: {
        type: DataTypes.DECIMAL(10, 2), // Rate jo tasweer mein likha hai
    },
    noOfCartons: {
        type: DataTypes.INTEGER, // Cartons Qty
    },
    pcsInBox: {
        type: DataTypes.INTEGER, // Pcs in a box
    },
    totalPcs: {
        type: DataTypes.INTEGER, // Total Pcs
    },
    otherItemDetails: {
        type: DataTypes.TEXT, // Other Item Details
    },
    commentsRemarks: {
        type: DataTypes.TEXT, // comments/Remarks
    },
    hsCode: {
        type: DataTypes.STRING, // HS Code
    },
    dutyWorking: {
        type: DataTypes.TEXT, // Duty / Working
    },
    containerNo: {
        type: DataTypes.STRING, // Container #
    },
    shippingCompany: {
        type: DataTypes.STRING, // Shipping company
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1, // Stage 1-9
    }
}, {
    tableName: 'bookings',
    timestamps: true
});

export default Booking;
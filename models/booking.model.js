import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
// import Customer from "./customer.model.js";

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
            model: 'customers', // Table name (lowercase)
            key: 'id'
        }
    },
    description: {
        type: DataTypes.TEXT,
    },
    weight: {
        type: DataTypes.DECIMAL(10, 2),
    },
    volume: {
        type: DataTypes.STRING,
    },
    noOfCartons: {
        type: DataTypes.INTEGER,
    },
    hsCode: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1, // Stage 1-9
    }
}, {
    tableName: 'bookings',
    timestamps: true
});

// Booking.belongsTo(Customer, { foreignKey: 'customerId', as: 'customers' });

export default Booking;
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
// import Booking from "./booking.model.js";

const Customer = sequelize.define("Customer" , {
   id:{
    type: DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
   },
   name:{
    type:DataTypes.STRING,
    allowNull:false
   },
   phone:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
   },
   brandName:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
   },
   address:{
    type:DataTypes.STRING,
    allowNull:false
   }
});



// Customer.hasMany(Booking, { foreignKey: 'customerId', as: 'bookings' });
export default Customer;

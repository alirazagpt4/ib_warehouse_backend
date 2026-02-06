import Customer from "./customer.model.js";
import Booking from "./booking.model.js";

const setupAssociations = () => {
    // One-to-Many: Ek customer ki kai bookings
    Customer.hasMany(Booking, { 
        foreignKey: 'customerId', 
        as: 'bookings' 
    });

    // Many-to-One: Har booking kisi ek customer ki hai
    Booking.belongsTo(Customer, { 
        foreignKey: 'customerId', 
        as: 'customerDetail' 
    });
};

export default setupAssociations;
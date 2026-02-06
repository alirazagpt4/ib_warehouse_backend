import Customer from "../models/customer.model.js";

export const createCustomer = async(req , res) =>{
      const {name , phone , brandName , address} = req.body;
      if(!name || !phone || !brandName || !address){
        return res.status(400).json({message: "All fields are required"});
      }

    try {
       
        const existingCustomer = await Customer.findOne({
            where:{
                phone: phone
            }
        })
        if(existingCustomer){
            return res.status(400).json({message: "Customer already exists"});
        }

        const customer = await Customer.create({
            name,
            phone,
            brandName,
            address
        });

        return res.status(201).json({message: "Customer created successfully" , customer});
        
    } catch (error) {
        console.error("Error creating customer:", error);
        return res.status(500).json({ message: "Failed to create customer" });
    }
}


export const getAllCustomers = async (req , res) =>{
    try {
        // 1. Query Parameters se values nikalna (Default values ke saath)
        const { page = 1, limit = 10, search = '', sortBy = 'createdAt', order = 'DESC' } = req.query;

        // 2. Pagination Calculation
        const offset = (page - 1) * limit;

        // 3. Search Logic (Name ya Brand Name mein dhoondna)
        const searchCondition = search ? {
            [Op.or]: [
                { name: { [Op.like]: `%${search}%` } },
                { brandName: { [Op.like]: `%${search}%` } },
                { phone: { [Op.like]: `%${search}%` } }
            ]
        } : {};

        // 4. Sorting Logic
        const sortCondition = {
            [sortBy]: order === 'DESC' ? 'DESC' : 'ASC'
        };


        // 4. Database Query
        const { count, rows } = await Customer.findAndCountAll({
            where: searchCondition,
            order: [[sortBy, order]],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        // 5. Response with Metadata
        res.status(200).json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            customers: rows
        });


        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


export const updateCustomer = async (req , res) =>{
    const {id} = req.params;
    const {name , phone , brandName , address} = req.body;
    try {
        const customer = await Customer.findByPk(id);
        if(!customer){
            return res.status(404).json({message: "Customer not found"});
        }
        customer.name = name;
        customer.phone = phone;
        customer.brandName = brandName;
        customer.address = address;
        await customer.save();
        return res.status(200).json({message: "Customer updated successfully" , customer});
        
    } catch (error) {
        console.error("Error updating customer:", error);
        return res.status(500).json({ message: "Failed to update customer" });
    }
}



export const deleteCustomer = async (req ,res) =>{
    const {id} = req.params;
    try {
        const customer = await Customer.findByPk(id);
        if(!customer){
            return res.status(404).json({message: "Customer not found"});
        }
        await customer.destroy();
        return res.status(200).json({message: "Customer deleted successfully"});
    } catch (error) {
        console.error("Error deleting customer:", error);
        return res.status(500).json({ message: "Failed to delete customer" });
    }
}



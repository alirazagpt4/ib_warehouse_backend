import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        let hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Failed to register user" });
    }
};


export const login = async (req , res)=>{
    const {email , password} = req.body;

    try {
        const user = await User.findOne({where: {email}});
        
         if(!user){
            return res.json({message: "User not found"})
         }

         const isPasswordValid = await bcrypt.compare(password, user.password);
         if(!isPasswordValid){
            return res.json({message: "Invalid password"})
         }
         const token = jwt.sign({id: user.id , role: user.role , email: user.email , name: user.name}, process.env.JWT_SECRET);
         res.json({message: "User logged in successfully", token , role: user.role});
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Failed to log in user" });
    }
}


export const personalInfo = async(req , res) =>{
    res.json({message: "Personal info" , user: req.user});
}




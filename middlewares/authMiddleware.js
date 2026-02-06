import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const authMiddleware = (req, res, next) => {
    // 1. Header se string uthayein
    const authHeader = req.headers.authorization;

    // 2. Check karein ke header hai aur "Bearer " se shuru ho raha hai
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    // 3. Token ko alag karein
    const token = authHeader.split(' ')[1];

    try {
        // 4. Verify karein
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // User data request mein save karein
        next(); // Aglay step par jayein
    } catch (err) {
        return res.status(403).json({ message: "Invalid or Expired Token" });
    }
}
import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/api", (req, res) => {
    res.json({ message: "Hello ib apis" });
});


app.use("/api/users", userRoutes);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection has been established successfully.");

        app.listen(process.env.PORT, () => {
            console.log(`Server of ib_wharehouse_backend is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

startServer(); 
import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database";
import usersRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
app.use(express.json());
connectDatabase();

//routes
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);


//export
export default app;

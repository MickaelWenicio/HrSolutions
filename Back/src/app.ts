import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database";
import usersRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
app.use(express.json());
connectDatabase();

//routes
app.use("/users", usersRoutes);


//export
export default app;

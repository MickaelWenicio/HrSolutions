import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database";

dotenv.config();

const app = express();
app.use(express.json());
connectDatabase();


export default app;

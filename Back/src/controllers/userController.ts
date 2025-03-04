import userService from "../services/userService";
import { Request, Response } from "express";

class userController {
    async listUsers (req: Request, res: Response){
        try {
            const users = await userService.getAllUsers(); 
            res.json(users).status(200);
        } catch (err) {
            res.json({message: "Unexpected error getting users"}).status(500);
        };
    };
};

export default new userController();
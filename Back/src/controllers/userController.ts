import userService from "../services/userService";
import { Request, Response } from "express";

class userController {
    async getUsers (req: Request, res: Response){
        try {
            const users = await userService.getAllUsers(); 
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({message: "Unexpected error getting users"})
        };
    };

    async getUser (req: Request, res: Response){
        const {id} = req.body;
        
        try{
            const user = await userService.getSingleUser(id);
            if(!user){
                res.status(404).json({message: "User not found"});
            }
            res.status(200).json(user);
        }catch(err){
            res.status(500).json({message: "Unexpected error getting user"});
        };
    };
};

export default new userController();
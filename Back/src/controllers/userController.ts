import userService from "../services/userService";
import { Request, Response } from "express";

class userController {
    async getUsers (req: Request, res: Response){
        try {
            const users = await userService.getAllUsers(); 
            res.status(200).json(users);
        } catch (err) {
            console.error(err);
            res.status(500).json({message: "Erro inesperado ao buscar usuários."})
        };
    };

    async getUser (req: Request, res: Response){
        const {id} = req.body;
        
        try{
            const data = await userService.getSingleUser(id);
            res.status(data.status).json({message: data.message, user:data.info});
        }catch(err){
            console.error(err);
            res.status(500).json({message: "Erro inesperado ao buscar usuário."});
        };
    };
};

export default new userController();
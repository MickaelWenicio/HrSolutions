import { Request, Response } from "express";
import authService from "../services/authService";

class authController{
    async login(req: Request, res: Response){
        const {cpf, password} = req.body;
        try{
            const data = await authService.login({cpf, password});
            res.status(data.status).json({message: data.message, authInfo: data.info});
        }catch(err){
            res.status(500).json({message: "Unexpected error login"});
        };
       
    };
};

export default new authController;
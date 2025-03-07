import { client } from "../config/database";
import jwt from "jsonwebtoken";


class authService {
    async login(data:{cpf:string, password:string}){
        const {cpf, password} = data;

        if (!cpf || !password) {
            return {status: 400, message: "Preencha os dados de acesso corretamente.", info:""};
        }

        const query = "SELECT id, cpf, password, FROM users WHERE cpf = $1";

        try{
            const response = await client.query(query, [cpf]);
            const data = response.rows[0];

            if (!data || password !== data.password) {
                return {status: 403, message: "CPF ou senha inválidos.", info:""};
            }

            const SECRET_KEY = process.env.JWT_SECRET || "fallback-secret";
            const token = jwt.sign({userId: data.id}, SECRET_KEY, {expiresIn: "1h"});

            return { status: 200, message: "Usuário autenticado com sucesso.", info: {auth: true, token: token}};
        } catch(err){
            console.error(err);
            throw new Error('Error in login');
        };
    };
};

export default new authService;
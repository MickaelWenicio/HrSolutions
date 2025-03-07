import userModel from "../model/userModel";
import { client } from "../config/database";

class userService {

    async getAllUsers(){
        const query = "SELECT * FROM users";

        try{
            const response = await client.query(query, []);
            const data = response.rows.map(user => {
                return new userModel(user);
            });

            return {status: 200, message:"Usuários encontrados com sucesso.", info: data};
        }catch(err){
            console.error(err);
            throw new Error("Error in getAllUsers");
        };
    };

    async getSingleUser(id:number){
        const query = "SELECT * FROM users WHERE users.id = $1";
        
        try{
            const response = await client.query(query, [id]);
            const data = response.rows[0];

            if(!data){
                return { status: 404, message: "Usuário não Encontrado.", info: ""};
            }
            
            return {status: 200, message: "Usuário Encontrado.", info: data};
        }catch(err){
            console.error(err);
            throw new Error("Error in getSingleUser");
        };
    };
};

export default new userService();
import userModel from "../model/userModel";
import profileService from "./profileService";
import { client } from "../config/database";

class userService {

    async getAllUsers(){
        const query = "SELECT * FROM users";

        try{
            const response = await client.query(query, []);
            const data = await Promise.all(response.rows.map(async (user) => {
                const profileName = await profileService.getProfileName(user.profile_id);
                return { user: new userModel(user), profile: profileName };
            }));

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
            const data = new userModel(response.rows[0]);

            if(!data){
                return {status: 404, message: "Usuário não Encontrado.", info: ""};
            }
            
            return {status: 200, message: "Usuário Encontrado.", info: data};
        }catch(err){
            console.error(err);
            throw new Error("Error in getSingleUser");
        };
    };
};

export default new userService();
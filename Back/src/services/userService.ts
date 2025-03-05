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

            return data
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
            return data;
        }catch(err){
            console.error(err);
            throw new Error("Error in getSingleUser");
        };
    };
};

export default new userService();
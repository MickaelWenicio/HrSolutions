import userModel from "../model/userModel";
import { client } from "../config/database";

class userService {

    async getAllUsers
    
    
    (){
        const query = "SELECT * FROM users";

        try{
            const response = await client.query(query, []);
            const data = response.rows.map(user => {
                return new userModel(user);
            });

            return data
        }catch(err){
            console.error(err);
            throw new Error("Error in getAllUsers: " + err);
        };
    };
};

export default new userService();
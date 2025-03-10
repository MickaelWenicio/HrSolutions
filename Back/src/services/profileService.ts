import { client } from "../config/database";
import profilesModel from "../model/profileModel";

class profileService {
    constructor(){}

    async getProfileName(profileId: number){

        const query = "SELECT * FROM profiles WHERE id = $1";
        
        try{
            const response = await client.query(query, [profileId]);
            const data = new profilesModel(response.rows[0]);
            return data.getName();
        }catch (err){
            console.error(err);
            throw new Error("Error in getProfileName");
        };
    };
};

export default new profileService();
import { client } from "../config/database";

class authService {

    async login(data:{cpf:string, password:string}){
        const {cpf, password} = data;
        const query = "SELECT id, cpf, password FROM users WHERE cpf = $1";

        try{
            const response = await client.query(query, [cpf]);
            const userData = response.rows[0];

            if (!userData || password !== userData.password) {
                return { message: "CPF ou senha inválidos.", status: 403 };
            }
    
            return { user: {id: userData.id, cpf: userData.cpf}, status:200 };

        } catch(err){
            console.error(err);
            throw new Error('Error in login');
        };
    };
};

export default new authService;
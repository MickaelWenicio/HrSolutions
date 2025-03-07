import { client } from "../config/database";

class authService {

    async login(data:{cpf:string, password:string}){
        const {cpf, password} = data;

        if (!cpf || !password) {
            return {status: 400, message: "Preencha os dados de acesso corretamente.", info:""};
        }

        const query = "SELECT id, cpf, password FROM users WHERE cpf = $1";

        try{
            const response = await client.query(query, [cpf]);
            const data = response.rows[0];

            if (!data || password !== data.password) {
                return {status: 403, message: "CPF ou senha inválidos.", info:""};
            }

            return { status: 200, message: "Usuário autenticado com sucesso.", info: {id: data.id, cpf: data.cpf}};
        } catch(err){
            console.error(err);
            throw new Error('Error in login');
        };
    };
};

export default new authService;
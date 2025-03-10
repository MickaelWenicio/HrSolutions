export default class userModel {
    id: number | null;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    password: string;
    profileId: number;
    createdAt: Date | null;
    updatedAt: Date | null;
    
    constructor(data: {
        id: number | null,
        name: string,
        email: string,
        cpf: string,
        phone: string,
        cep: string,
        state: string,
        city: string,
        neighborhood: string,
        street: string,
        password: string,
        profile_id: number,
        created_at: Date | null,
        updated_at: Date | null,
    }){
        this.id = data.id ?? null;
        this.name = data.name;
        this.email = data.email;
        this.cpf = data.cpf;
        this.phone = data.phone;
        this.cep = data.cep;
        this.state = data.state;
        this.city = data.city;
        this.neighborhood = data.neighborhood;
        this.street = data.street;
        this.password = data.password;
        this.profileId = data.profile_id;
        this.createdAt = data.created_at ?? null;
        this.updatedAt = data.updated_at ?? null;
    };
};
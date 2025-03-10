class profilesModel {
    id: number;
    name: string;

    constructor(data: {id: number, name: string}){
        this.id = data.id;
        this.name = data.name;
    };

    getName(){
        return this.name;
    };
};

export default profilesModel;
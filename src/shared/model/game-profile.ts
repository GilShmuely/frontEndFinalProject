export class GameProfile{
    id: string;
    name: string;
    description: string;
    difficulty: string;
    url: string;
    constructor(id: string, name: string, difficulty: string, description: string, url: string){
        this.id = id;
        this.name = name;
        this.difficulty = difficulty;
        this.description = description;
        this.url = url;
    }
}
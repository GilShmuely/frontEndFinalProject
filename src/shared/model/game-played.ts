export class gamePLayed {
    static lastGameID = 0;
    categoryID: number;
    gameID: number;
    date: Date;
    score: number;
    constructor(categoryID: number, gameID: number, date: Date, score: number) {
        this.categoryID = categoryID;
        this.gameID = gamePLayed.generateGameID();
        this.date = date;
        this.score = score;
    }
    static generateGameID(): number {
        this.lastGameID += 1; 
        return this.lastGameID;  
    }
}
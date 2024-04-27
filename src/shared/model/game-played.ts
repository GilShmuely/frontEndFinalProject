export class gamePLayed {
    categoryID: number;
    gameID: number;
    date: Date;
    score: number;
    constructor(categoryID: number, gameID: number, date: Date, score: number) {
        this.categoryID = categoryID;
        this.gameID = gameID;
        this.date = date;
        this.score = score;
    }

}
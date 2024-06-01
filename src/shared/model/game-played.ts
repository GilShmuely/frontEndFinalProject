export class GamePlayed {
    static lastGameID = 0;
    categoryID: number;
    gameID: number;
    date: Date;
    score: number;
    secondsLeftInGame: number;
    secondsPlayed: number;
  
    constructor(
      categoryID: number,
      gameID: number,
      date: Date,
      score: number,
      secondsLeftInGame: number,
      secondsPlayed: number
    ) {
      this.categoryID = categoryID;
      this.gameID = GamePlayed.generateGameID();
      this.date = date;
      this.score = score;
      this.secondsLeftInGame = secondsLeftInGame;
      this.secondsPlayed = secondsPlayed;
    }
  
    static generateGameID(): number {
      this.lastGameID += 1;
      return this.lastGameID;
    }
  }
  
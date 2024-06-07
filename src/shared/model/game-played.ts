export class GamePlayed {
  static lastGameID = 0;
  categoryID: string;
  gameID: string;
  date: Date;
  score: number;
  secondsLeftInGame: number;
  secondsPlayed: number;

  constructor(
    categoryID: string,
    gameID: string,
    date: Date,
    score: number,
    secondsLeftInGame: number,
    secondsPlayed: number
  ) {
    this.categoryID = categoryID;
    this.gameID = gameID;
    this.date = date;
    this.score = score;
    this.secondsLeftInGame = secondsLeftInGame;
    this.secondsPlayed = secondsPlayed;
  }
}

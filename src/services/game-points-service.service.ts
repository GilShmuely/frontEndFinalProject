import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamePointsService {
  private GamePlayed: any[]; 
  private gameID = 0;

  constructor() {
    this.GamePlayed = [];
    this.loadGames();
  }
  getNewGameId(): number {
    this.gameID++;
    return this.gameID;
  }
  getGamePlayed() {
    return this.GamePlayed;
  }

  addGamePlayed(gamePlayed: any) {
    this.GamePlayed.push(gamePlayed);
    this.saveGames();
  }

  private saveGames() {
    localStorage.setItem('gamePlayed', JSON.stringify(this.GamePlayed));
  }

  private loadGames() {
    const games = localStorage.getItem('gamePlayed');
    this.GamePlayed = games ? JSON.parse(games) : [];
  }
}

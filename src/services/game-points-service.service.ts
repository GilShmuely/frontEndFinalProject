import { Injectable } from '@angular/core';
import { categories } from '../shared/data/categories';
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

  loadGames() {
    const games = localStorage.getItem('gamePlayed');
    this.GamePlayed = games ? JSON.parse(games) : [];
  }

  getLatestGame() {
    return this.GamePlayed.length > 0 ? this.GamePlayed[this.GamePlayed.length - 1] : null;
  }

  getTotalGamesPlayed(): number {
    return this.GamePlayed.length;
  }
  getTotalPoints(): number {
    return this.GamePlayed.reduce((acc, game) => acc + (game.score || 0), 0);
  }
  getAllCategoryIDs(): number[] {
    return this.GamePlayed.map(game => game.categoryID);
  }
  getMostFrequentCategoryID(): number {
    const categoryIDs = this.getAllCategoryIDs();
    const categoryCounts = categoryIDs.reduce((acc: { [id: number]: number }, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {} as { [id: number]: number });
    const mostFrequentCategoryID = Object.entries(categoryCounts).reduce((a, b) => b[1] > a[1] ? b : a)[0];

    return +mostFrequentCategoryID;
  }
  getMostFrequentCategoryName(): string {
    const mostFrequentCategoryID = this.getMostFrequentCategoryID();
    const category = categories.find(cat => cat.id === mostFrequentCategoryID);
    return category ? category.name : 'Category not found';
  }

  getUniqueCategoryCount(): number {
    const categoryIDs = this.GamePlayed.map(game => game.categoryID);
    const uniqueCategoryIDs = new Set(categoryIDs);
    return uniqueCategoryIDs.size;
  }

  
}

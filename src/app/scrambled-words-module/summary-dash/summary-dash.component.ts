import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../../shared/model/category';
import { GamePlayed } from '../../../shared/model/game-played';
import { GamePointsService } from '../../../services/game-points-service.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-summary-dash',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './summary-dash.component.html',
  styleUrl: './summary-dash.component.css'
})
export class SummaryDashComponent implements OnInit {
  currentCategory: Category | undefined;
  score: number = 0;
  lastGame: GamePlayed | undefined;
  guesses: { origin: string, userInput: string, isCorrect: boolean }[] = [];
  totalWords: number = 0;
  displayedColumns: string[] = ['origin', 'userInput', 'isCorrect'];
  correctGuesses: number = 0;
  averageGameDuration: number = 0;
  totalPlayTime: number = 0;;
  completionRate: number = 0;;

  constructor(private router: Router, private gameService: GamePointsService) {
    const navigation = this.router.getCurrentNavigation(); if (navigation && navigation.extras.state) {
      this.currentCategory = navigation.extras.state['category'];
      this.guesses = navigation.extras.state['guesses'];
      this.correctGuesses = this.guesses.filter(guess => guess.isCorrect).length;
      this.totalWords = this.guesses.length;
    }
  }
  ngOnInit(): void {
    this.gameService.getLatestGame();
    console.log('Latest game:', this.gameService.getLatestGame())
    console.log(this.guesses);
    console.log('Correct guesses:', this.correctGuesses);
    
    console.log('Current category:', this.currentCategory);

  }
  getLatestGame() {
    return this.gameService.getLatestGame();
  }

  newGame() {
    this.router.navigate(['play']);
  }
  calculateMetrics(games: any[]): void {
    const totalGames = games.length;
    const totalDuration = games.reduce((acc, game) => acc + game.secondsPlayed, 0);
    const completedGames = games.filter(game => game.secondsLeftInGame === 0).length;
  }
}

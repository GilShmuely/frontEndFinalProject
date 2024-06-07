import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Category } from '../../../shared/model/category';
import { Router } from '@angular/router';
import { GamePointsService } from '../../../services/game-points-service.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-summary-sorter',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTableModule, MatButtonModule],
  templateUrl: './summary-sorter.component.html',
  styleUrls: ['./summary-sorter.component.css']
})
export class SummarySorterComponent implements OnInit {
  currentCategory: Category | undefined;
  grade: number = 0;
  correctWords: string[] = [];
  randomWords: string[] = [];
  guesses: { origin: string, Category: string, isCorrect: boolean }[] = [];
  displayedColumns: string[] = ['origin', 'userInput', 'isCorrect'];

  constructor(private router: Router, private gameService: GamePointsService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.currentCategory = (navigation.extras.state as { category: Category }).category;
      this.guesses = navigation.extras.state['guesses'];
    }
  }

  ngOnInit(): void {
    this.initializeWords();
  }

  initializeWords(): void {
    this.correctWords = this.guesses.filter(guess => guess.isCorrect).map(guess => guess.origin);
    this.randomWords = this.guesses.map(guess => guess.origin);
  }

  newGame() {
    this.router.navigate(['play']);
  }
}

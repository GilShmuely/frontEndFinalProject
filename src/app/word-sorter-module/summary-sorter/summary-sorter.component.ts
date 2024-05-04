import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Category } from '../../../shared/model/category';
import { Router } from '@angular/router';
import { GamePointsService } from '../../../services/game-points-service.service';
@Component({
  selector: 'app-summary-sorter',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTableModule],
  templateUrl: './summary-sorter.component.html',
  styleUrl: './summary-sorter.component.css'
})
export class SummarySorterComponent implements OnInit {
  currentCategory: Category | undefined;// done
  grade: number = 0; //
  correctWords: string[] = [];
  randomWords: string[] = [];
  //randomwords.cateogry
  userInput: boolean[] = [];
  iscorrect: boolean[] = [];
  guesses: { origin: string, userInput: boolean, isCorrect: boolean }[] = [];
  displayedColumns: string[] = ['origin', 'userInput', 'isCorrect'];
  constructor(private router: Router, private gameService: GamePointsService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.currentCategory = (navigation.extras.state as { category: Category }).category;
    }
  }
  ngOnInit(): void {
    this.gameService.getLatestGame();
    console.log('Latest game:', this.gameService.getLatestGame());

  }
  getLatestGame() {
    return this.gameService.getLatestGame();
  }
}

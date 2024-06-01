import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../../shared/model/category';
import { CategoriesService } from '../../services/categories.service';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { SuccessDialogComponent } from '../../success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GamePlayed } from '../../../shared/model/game-played';
import { GamePointsService } from '../../../services/game-points-service.service';
import { TimerComponent } from "../../time-management/timer/timer.component";

@Component({
  selector: 'app-word-sorter-main',
  standalone: true,
  templateUrl: './word-sorter-main.component.html',
  styleUrls: ['./word-sorter-main.component.css'],
  imports: [MatButtonModule, MatProgressBarModule, CommonModule, TimerComponent]
})
export class WordSorterMainComponent implements OnInit {
  currentCategory: Category | undefined;
  allCategories = this.categoryService.list();
  allWords: string[] = [];
  randomWords: string[] = [];
  progress: number = 0;
  currentWordIndex: number = 0;
  totalWords: number = 6;
  guesses: { origin: string, Category: string, isCorrect: boolean }[] = [];
  userInput: string = '';
  grade: number = 0;
  gameDuration = 300; // Example duration in seconds (5 minutes)
  timeLeft: number = this.gameDuration;
  difficulty: string = 'medium'; 

  constructor(private router: Router, private categoryService: CategoriesService, private dialog: MatDialog, private gamePointsService: GamePointsService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.currentCategory = (navigation.extras.state as { category: Category }).category;
    }
    this.allWords = this.allCategories.flatMap(category => category.words.map(word => word.origin));
  }

  ngOnInit(): void {
    if (this.currentCategory) {
      this.randomWords = this.shuffleArray([
        ...this.getRandomWords(this.currentCategory.words.map(word => word.origin), 3),
        ...this.getRandomWords(this.allWords, 3)
      ]);
    }
  }

  getRandomWords(words: string[], count: number): string[] {
    let result = [];
    for (let i = 0; i < count; i++) {
      let randomIndex = Math.floor(Math.random() * words.length);
      result.push(words[randomIndex]);
      words.splice(randomIndex, 1);
    }
    return result;
  }

  nextWord(): void {
    console.log('currentWordIndex:', this.currentWordIndex);
    console.log('randomWords.length:', this.randomWords.length);
    console.log('currentCategory:', this.currentCategory);
    if (this.currentWordIndex < this.randomWords.length - 1) {
      console.log('Incrementing currentWordIndex');
      this.currentWordIndex++;
    } else {
      console.log('Creating newGame');
      if (this.currentCategory && this.timeLeft !== undefined) {
        let newGame = new GamePlayed(
          this.currentCategory.id,
          this.gamePointsService.getNewGameId(),
          new Date(),
          this.grade,
          this.gameDuration - this.timeLeft,
          this.gameDuration
        );
        this.gamePointsService.addGamePlayed(newGame);
        console.log('newGame:', newGame);
        this.router.navigate(['/sumsort'], {
          state: {
            category: this.currentCategory,
            guesses: this.guesses
          }
        });
      } else {
        console.error('currentCategory or timeLeft is undefined');
      }
    }
    console.log('grade:', this.grade);
  }

  openDialog(userClickedYes: boolean): void {
    const correct = this.isCorrectWord();

    let wordCategory = '';
    for (let category of this.allCategories) {
      if (category.words.some(word => word.origin === this.randomWords[this.currentWordIndex])) {
        wordCategory = category.name;
        break;
      }
    }

    this.guesses.push({
      origin: this.randomWords[this.currentWordIndex],
      Category: wordCategory,
      isCorrect: correct
    });

    let success = false;
    if ((userClickedYes && correct) || (!userClickedYes && !correct)) {
      success = true;
      this.grade++;
    }

    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '250px',
      data: {
        success: success,
        message: success ? 'You got it right!' : 'You got it wrong!'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.nextWord();
      this.progress += 100 / this.totalWords;
      if (result === true) {
        this.grade++;
      } else {
        this.grade--;
      }
    });
  }

  isCorrectWord(): boolean {
    if (this.currentCategory && this.randomWords.length > this.currentWordIndex) {
      return this.currentCategory.words.map(word => word.origin).includes(this.randomWords[this.currentWordIndex]);
    }
    return false;
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  updateTimeLeft(timeLeft: number) {
    this.timeLeft = timeLeft;
    if (timeLeft === 0) {
      this.endGame();
    }
  }

  endGame() {
    // Logic to handle end of game
  }
}

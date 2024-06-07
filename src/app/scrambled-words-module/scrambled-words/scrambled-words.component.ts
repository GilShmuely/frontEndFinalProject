import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ExitGameComponent } from '../../exit-game/exit-game.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CurrentPointsComponent } from "../current-points/current-points.component";
import { Category } from '../../../shared/model/category';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TranslatedWord } from '../../../shared/model/translated-word';
import { FormsModule } from '@angular/forms';
import { SuccessDialogComponent } from '../../success-dialog/success-dialog.component';
import { DialogRef } from '@angular/cdk/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GamePlayed } from '../../../shared/model/game-played';
import { GamePointsService } from '../../../services/game-points-service.service';
import { state } from '@angular/animations';
import { TimerComponent } from "../../time-management/timer/timer.component";
import { GameProfile } from '../../../shared/model/game-profile';
import { GameDifficulty } from '../../../shared/model/game-difficulty';

@Component({
  selector: 'app-scrambled-words',
  standalone: true,
  templateUrl: './scrambled-words.component.html',
  styleUrls: ['./scrambled-words.component.css'],
  imports: [MatDialogModule, MatButtonModule, CurrentPointsComponent, MatIconModule, CommonModule, FormsModule, MatInputModule, MatProgressBarModule, TimerComponent]
})
export class ScrambledWordsComponent implements OnInit {
  currentCategory: Category | undefined;
  currentWord?: TranslatedWord;
  currentWordIndex: number = 0;
  scrambledWord: string = '';
  userInput: string = '';
  progress: number = 0;
  gamePlayed: GamePlayed[] = [];
  score: number = 0;
  guesses: { origin: string, userInput: string, isCorrect: boolean }[] = [];
  correctGuesses: number = 0;
  currentGame: GameProfile | undefined;
  difficulty: string = 'easy';
  gameDuration = 60; // 1 minute
  timeLeft: number = this.gameDuration;
  newGame: GamePlayed | undefined;

  constructor(public dialog: MatDialog, private router: Router, private gamePointsService: GamePointsService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.currentCategory = (navigation.extras.state as { category: Category }).category;
    }
  }

  ngOnInit(): void {
    console.log('Current category:', this.currentCategory);
    this.updateCurrentWord();
    if (this.currentCategory && this.currentCategory.words) {
      this.shuffleArray(this.currentCategory.words);
    }
    
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ExitGameComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.router.navigate(['/play']);
      }
    });
  }

  updateCurrentWord() {
    if (this.currentCategory && this.currentCategory.words.length > this.currentWordIndex) {
      this.currentWord = this.currentCategory.words[this.currentWordIndex];
      this.scrambledWord = this.scrambleString(this.currentWord.origin); // Rescramble the word
    } else {
      console.error('No words available or category is undefined');
    }
  }

  shuffleArray(array: TranslatedWord[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  scrambleString(str: string): string {
    let arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('').toLocaleUpperCase();
  }

  nextWord() {
    if (this.currentCategory && this.currentWordIndex < this.currentCategory.words.length - 1) {
      this.currentWordIndex++;
      this.updateCurrentWord();
      if (this.currentWord) {
        this.scrambledWord = this.scrambleString(this.currentWord.origin);
      }
    } else {
      this.endGame();
    }
  }

  onSubmit(userInput: string) {
    userInput = userInput.toLocaleUpperCase();
    let correctWord = this.currentWord?.origin;
    correctWord = correctWord ? correctWord.toLocaleUpperCase() : '';
    const isCorrect = Boolean(this.currentWord && userInput === this.currentWord.origin.toLocaleUpperCase());
    if (this.currentWord) {
      this.guesses.push({ origin: this.currentWord.origin, userInput, isCorrect });
    }
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '250px',
      data: {
        success: userInput === correctWord,
        message: userInput === correctWord ? 'You guessed right! + 1 point' : 'Incorrect guess, -1 point!'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.nextWord();
      this.userInput = '';
      this.progress += 100 / (this.currentCategory?.words.length || 1);
      if (result === true) {
        this.score++;
      } else {
        this.score--;
      }
    });
  }

  clearInput() {
    this.userInput = '';
    console.log(this.score);
  }

  updateTimeLeft(timeLeft: number) {
    this.timeLeft = timeLeft;
    if (timeLeft === 0) {
      this.endGame();
    }
  }

  
  changeDifficulty(difficulty: string) {
    let timeLeft: number;
  
    switch(difficulty) {
      case 'easy':
        timeLeft = 300; // 300 seconds for easy difficulty
        break;
      case 'medium':
        timeLeft = 200; // 200 seconds for medium difficulty
        break;
      case 'hard':
        timeLeft = 100; // 100 seconds for hard difficulty
        break;
      default:
        timeLeft = 300; // default to easy difficulty
    }
  
    this.updateTimeLeft(timeLeft);
  }
  endGame() {
    if (this.currentCategory) {
      if (this.timeLeft !== undefined && this.score !== undefined) {
        this.newGame = new GamePlayed(
          this.currentCategory.id,
          this.currentGame?.id || '2',  
          new Date(),
          this.score,
          this.timeLeft,
          this.gameDuration - this.timeLeft
        );
        this.gamePointsService.addGamePlayed(this.newGame).then(() => {
          this.router.navigate(['/sumscram'], {
            state: {
              category: this.currentCategory,
              guesses: this.guesses
            }
          });
        }).catch(error => {
          console.error('Error adding game:', error);
        });
      } else {
        console.error('timeLeft or score is undefined');
      }
    }
  }
  
  

}

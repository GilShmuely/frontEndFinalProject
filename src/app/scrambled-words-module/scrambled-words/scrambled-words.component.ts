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
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';






@Component({
  selector: 'app-scrambled-words',
  standalone: true,
  templateUrl: './scrambled-words.component.html',
  styleUrl: './scrambled-words.component.css',
  imports: [MatDialogModule, MatButtonModule, CurrentPointsComponent, MatIconModule, CommonModule, FormsModule, MatInputModule, MatProgressBarModule]
})
export class ScrambledWordsComponent implements OnInit {
  currentCategory: Category | undefined;
  currentWord?: TranslatedWord;
  currentWordIndex: number = 0;
  scrambledWord: string = '';
  userInput: string = '';
  progress: number = 0;

  constructor(public dialog: MatDialog, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.currentCategory = (navigation.extras.state as { category: Category }).category;
    }
  }
  ngOnInit(): void {
    console.log('Current category:', this.currentCategory);
    this.updateCurrentWord();
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
      // Shuffle words array
      this.shuffleArray(this.currentCategory.words);

      // Select the word at the current index
      this.currentWord = this.currentCategory.words[this.currentWordIndex];
      this.scrambledWord = this.scrambleString(this.currentWord.origin);  // Rescramble the word
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
      console.log('No more words to display');
    }
  }

  onSubmit(userInput: string) {
    userInput = userInput.toLocaleUpperCase();
    let correctWord = this.currentWord?.origin;
    correctWord = correctWord ? correctWord.toLocaleUpperCase() : '';
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '250px',
      data: {
        success: userInput === correctWord,
        message: userInput === correctWord ? 'You guessed right!' : 'Incorrect guess, try again!'
      }
    }
    );

    dialogRef.afterClosed().subscribe(result => {

      this.nextWord();
      this.userInput = '';
      this.progress += 100 / (this.currentCategory?.words.length || 1);


    });
  }

}

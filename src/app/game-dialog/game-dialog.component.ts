import { Component, Inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { GameDataService } from '../../services/game-data.service';
import { GameProfile } from '../../shared/model/game-profile';
import { CommonModule} from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from '../../shared/model/category';

@Component({
  selector: 'app-game-dialog',
  standalone: true,
  imports: [ FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './game-dialog.component.html',
  styleUrl: './game-dialog.component.css'
})
export class GameDialogComponent {
  games: GameProfile[] = [];
  currentGame? : GameProfile;
  currentCategory = this.data.category;
  constructor(private GameDataService:GameDataService, private router: Router,   private dialogRef: MatDialogRef<GameDialogComponent>,     @Inject(MAT_DIALOG_DATA) public data: { category: Category }

){}
  ngOnInit() :void{
    this.games = this.GameDataService.list();
    console.log(this.games)
    console.log(this.currentCategory);
    console.log('Words in Current Category:', this.currentCategory?.words);  // Check if words are defined
  }
  close() {
    this.dialogRef.close();
  }
  startGame(){
    this.router.navigate(['/game', this.currentGame?.id]);
    this.dialogRef.close();
  }
  selectGame(game: GameProfile){
    this.currentGame = game;
  }

  chooseGame(game:GameProfile | undefined){
    if (this.currentGame && this.currentGame.url){
      this.router.navigate([this.currentGame.url], {state: {category: this.currentCategory}})
      this.dialogRef.close()
    }
   }
   
}

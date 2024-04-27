import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Category } from '../../shared/model/category';
import { CategoryViewComponent } from '../category-view/category-view.component';
import { MatDialog } from '@angular/material/dialog';
import { GameDialogComponent } from '../game-dialog/game-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
@Input() currentCategory?: Category;
  constructor(private matDialog:MatDialog) {
   }
 openDialog(){
  this.matDialog.open(GameDialogComponent, {
    data: { category: this.currentCategory } 
 });}


 isUpdatedWithinLastWeek(date: Date | undefined): boolean {
  if (!date) {
    return false;
  }
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return new Date(date) >= oneWeekAgo;
}
}

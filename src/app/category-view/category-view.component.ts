import { Component, OnInit } from '@angular/core';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { CategoryCardComponent } from "../category-card/category-card.component";
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { categories } from '../../shared/data/categories';

@Component({
    selector: 'app-category-view',
    standalone: true,
    templateUrl: './category-view.component.html',
    styleUrl: './category-view.component.css',
    imports: [CategoryCardComponent,MatCardModule, CommonModule]
})
export class CategoryViewComponent implements OnInit {
  allCategories: Category[] = [];
  constructor(private categoryService: CategoriesService) {

  }
  ngOnInit() :void{
    this.allCategories = this.categoryService.list();
    console.log(this.allCategories)
    console.log('Categories:', this.allCategories);
    console.log('Categories:', this.allCategories[0].words);
    
  }
  openGameDialog(category: Category){
    console.log('Selected category:', category);
  }
}

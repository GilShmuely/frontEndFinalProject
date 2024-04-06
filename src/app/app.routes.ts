import { Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { MatchingGameComponent } from './matching-game/matching-game.component';
import { ScrambledWordsComponent } from './scrambled-words/scrambled-words.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {path: "", component: DashboardComponent},
    {path: "admin", component: CategoriesListComponent},
    {path: "play", component: CategoryViewComponent},
    {path: "category/:id", component: CategoryFormComponent},
    {path: "newcategory", component: CategoryFormComponent},
    {path: "matching", component: MatchingGameComponent},
    {path: "scrambled", component: ScrambledWordsComponent}
];

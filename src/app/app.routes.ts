import { Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { MatchingGameComponent } from './matching-game/matching-game.component';
import { ScrambledWordsComponent } from './scrambled-words-module/scrambled-words/scrambled-words.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SummaryDashComponent } from './scrambled-words-module/summary-dash/summary-dash.component';
import { WordSorterMainComponent } from './word-sorter-module/word-sorter-main/word-sorter-main.component';
import { SummarySorterComponent } from './word-sorter-module/summary-sorter/summary-sorter.component';

export const routes: Routes = [
    {path: "", component: DashboardComponent},
    {path: "admin", component: CategoriesListComponent},
    {path: "play", component: CategoryViewComponent},
    {path: "category/:id", component: CategoryFormComponent},
    {path: "newcategory", component: CategoryFormComponent},
    {path: "matching", component: MatchingGameComponent},
    {path: "scrambled", component: ScrambledWordsComponent},
    {path: "sumscram", component: SummaryDashComponent},
    {path: "sorter", component: WordSorterMainComponent},
    {path: "sumsort", component: SummarySorterComponent}
];

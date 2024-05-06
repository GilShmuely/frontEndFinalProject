import { Component, OnInit } from '@angular/core';
import { GamePointsService } from '../../services/game-points-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  mostPlayedCategoryName: string = '';
  mostPlayedGamesCount: number = 0;

  totalGamesPlayed: number = 0;
  totalPoints: number = 0;
  highestScoreGameName: string | null = null;
  lowestScoreGameName: string | null = null;
  amountOfCategoriesPlayed: number = 0;

  constructor(private gamePointsService: GamePointsService) { }

  ngOnInit(): void {
    this.totalGamesPlayed = this.gamePointsService.getTotalGamesPlayed();
    this.totalPoints = this.gamePointsService.getTotalPoints();
    this.mostPlayedCategoryName = this.gamePointsService.getMostFrequentCategoryName();
    this.amountOfCategoriesPlayed = this.gamePointsService.getUniqueCategoryCount();
  }
}

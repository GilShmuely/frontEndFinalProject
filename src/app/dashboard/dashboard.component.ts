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
  averageGameTime: number = 0;
  totalGameTime: number = 0;
  percentageOfGamesCompletedOnTime: number = 0;

  constructor(private gamePointsService: GamePointsService) { }

  async ngOnInit(): Promise<void> {
    this.totalGamesPlayed = await this.gamePointsService.getTotalGamesPlayed();
    this.totalPoints = await this.gamePointsService.getTotalPoints();
    this.mostPlayedCategoryName = await this.gamePointsService.getMostFrequentCategory();
    this.amountOfCategoriesPlayed = await this.gamePointsService.getUniqueCategoryCount();
    this.averageGameTime = await this.gamePointsService.getAverageGameTime();
    this.totalGameTime = await this.gamePointsService.getTotalGameTime();
    this.percentageOfGamesCompletedOnTime = await this.gamePointsService.getPercentageOfGamesCompletedOnTime();
  }
}

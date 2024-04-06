import { Injectable } from '@angular/core';
import { GameProfile } from '../shared/model/game-profile';
import { GameDifficulty } from '../shared/model/game-difficulty';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  private games: GameProfile[] = [new GameProfile('1', 'Matching Game',GameDifficulty.HARD, "Choose every word's translation from a list of 4 optionns",'matching'),
  new GameProfile('2', "Scrambled words", "Description of scrambled words games ", GameDifficulty.EASY, "scrambled") ];

  constructor() { }

  list(): GameProfile[] {
    return Array.from(this.games.values());
  }
}

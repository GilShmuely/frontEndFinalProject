import { TestBed } from '@angular/core/testing';

import { GamePointsServiceService } from './game-points-service.service';

describe('GamePointsServiceService', () => {
  let service: GamePointsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamePointsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentPointsComponent } from './current-points.component';

describe('CurrentPointsComponent', () => {
  let component: CurrentPointsComponent;
  let fixture: ComponentFixture<CurrentPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentPointsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryDashComponent } from './summary-dash.component';

describe('SummaryDashComponent', () => {
  let component: SummaryDashComponent;
  let fixture: ComponentFixture<SummaryDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummaryDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

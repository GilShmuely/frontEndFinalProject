import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarySorterComponent } from './summary-sorter.component';

describe('SummarySorterComponent', () => {
  let component: SummarySorterComponent;
  let fixture: ComponentFixture<SummarySorterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummarySorterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummarySorterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

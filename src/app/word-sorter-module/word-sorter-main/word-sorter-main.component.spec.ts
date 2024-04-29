import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSorterMainComponent } from './word-sorter-main.component';

describe('WordSorterMainComponent', () => {
  let component: WordSorterMainComponent;
  let fixture: ComponentFixture<WordSorterMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordSorterMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordSorterMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

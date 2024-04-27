import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrambledWordsComponent } from './scrambled-words.component';

describe('ScrambledWordsComponent', () => {
  let component: ScrambledWordsComponent;
  let fixture: ComponentFixture<ScrambledWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrambledWordsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScrambledWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

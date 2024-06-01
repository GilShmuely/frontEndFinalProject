import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { GameDifficulty } from '../../../shared/model/game-difficulty';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit, OnDestroy{
  @Input() duration?: number;
  @Input() difficulty: string = 'easy'; // ברירת מחדל
  @Output() reportTimeLeft = new EventEmitter<number>();

  private intervalId: any;
  public timeLeft!: number;

  ngOnInit(): void {
    this.setGameDuration();
    this.startTimer();
  }

  startTimer(): void {
    this.intervalId = setInterval(() => {
      this.timeLeft--;
      this.reportTimeLeft.emit(this.timeLeft);
      if (this.timeLeft <= 0) {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    return `${this.pad(minutes)}:${this.pad(remainingSeconds)}`;
  }
  
  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  setGameDuration(): void {
    switch (this.difficulty) {
      case 'easy':
        this.duration = 60;
        break;
      case 'medium':
        this.duration = 75; 
        break;
      case 'hard':
        this.duration = 100;
        break;
      default:
        this.duration = 60;
    }
    this.timeLeft = this.duration;
    console.log('Duration set to:', this.duration);

  }
}

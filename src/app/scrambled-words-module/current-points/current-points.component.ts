import { Component } from '@angular/core';

@Component({
  selector: 'app-current-points',
  standalone: true,
  imports: [],
  templateUrl: './current-points.component.html',
  styleUrl: './current-points.component.css'
})
export class CurrentPointsComponent {
currentPoints: number = 0;
}

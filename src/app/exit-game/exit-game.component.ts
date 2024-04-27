import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-exit-game',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './exit-game.component.html',
  styleUrl: './exit-game.component.css'
})
export class ExitGameComponent {
  constructor(
    public dialogRef: MatDialogRef<ExitGameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

onNoClick(): void {
  this.dialogRef.close(); 
}
}


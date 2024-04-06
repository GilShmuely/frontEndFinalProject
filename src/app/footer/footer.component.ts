import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule, MatIconModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  constructor(private router: Router, private route: ActivatedRoute) { }
  help() {
    const url = this.router.url;
  
    if (url.includes('games') ){
      alert('This is the main view of the game section of the app. Here you can choose a category and then a game to play based on the words from that category.');
    } else if (url.includes('matching')) {
      alert('This is the matching game. You will see a grid of cards with words on them. Click on a card to select it and then click on another card that fits the translation of the first card. If you match the cards, they will be disabled. Else, they will reset and you will have to try again.');
    } else if (url.includes('scrambled')) {
      alert('This is the scrambled words game. You will see a word with its letters scrambled. Click on the letters to unscramble them and form the correct word. If you get the word right, you will move on to the next word. If you get the word wrong, you will have to try again.');
    }else if (url === '/'){ {
      alert('This is the main view of the app. Here you can see your stats');}
    }else if (url.includes('admin')) {
      alert('This is the admin view of the app. Here you can add, edit, or delete categories.');
    }
  }
 }

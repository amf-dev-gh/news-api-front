import { Component, input } from '@angular/core';
import { News } from '../../interfaces/news.interface';

@Component({
  selector: 'app-card-news',
  imports: [],
  templateUrl: './card-news.component.html',
})
export class CardNewsComponent {

  news = input.required<News>()

}

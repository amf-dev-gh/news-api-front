import { Component, inject } from '@angular/core';
import { NewsApiService } from './services/news-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardNewsComponent } from './components/card-news/card-news.component';
import { CardSpinnerComponent } from './components/card-spinner/card-spinner.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, CardNewsComponent, CardSpinnerComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {

  private readonly apiService = inject(NewsApiService);
  readonly news = this.apiService.news;
  about: string = '';

  getNewsAbout(): void {
    if(this.about === '' || this.about.length < 3){
      return;
    }
    this.apiService.getNews(this.about);
    this.about = '';
  }
}

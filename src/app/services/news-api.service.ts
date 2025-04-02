import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { News } from '../interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  // private apiUrl: string = "http://localhost:8080/api/news";
  private apiUrl: string = "https://news-api-back.onrender.com/api/news";
  news = signal<News[]>([])

  constructor(private http: HttpClient) {
    this.getGeolocation()
  }

  getNews(about: string): void {
    this.news.set([]);
    this.http.get<any>(`${this.apiUrl}/${about}`).subscribe({
      next: news => this.news.set(news),
      error: e => console.error("News not found",e)
    });
  }

  private getGeolocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locationUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

          this.http.get<any>(locationUrl).subscribe({
            next: data => {
              const city = data.address.city;
              this.getNews(city);
            },
            error: e => console.error("No data city", e)
          });
        },
        (error) => {
          console.error("Don't have geolocation permissions", error);
          this.getNews("el mundo");
        }
      );
    }
  }

}

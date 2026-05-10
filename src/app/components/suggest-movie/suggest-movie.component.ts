import { animate, query, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/internal/operators/delay';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-suggest-movie',
  templateUrl: './suggest-movie.component.html',
  styleUrls: ['./suggest-movie.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ])
  ]
})
export class SuggestMovieComponent implements OnInit {

  public showTVMovieBtn: boolean = true;
  public userPreference: string = '';
  public recommendations: any[] = [];
  public explanation: string = '';
  public isLoading: boolean = false;
  public nowPlaying: string | any[];
  public current = 0;
  constructor(private _movie: MoviesService, private router: Router) { }

  ngOnInit() {
    this.trendingMovies(1);
    this.sliderTimer();
  }

  async getRecommendations() {
    if (!this.userPreference.trim()) {
      return;
    }

    this.isLoading = true;
    this.recommendations = [];
    this.explanation = '';

    try {
      // Get recommendations
      const recResponse = await this._movie.getRecommendations(this.userPreference).toPromise();
      this.recommendations = recResponse.recommendations;

      // Get explanation
      const expResponse = await this._movie.getExplanation(this.userPreference, this.recommendations).toPromise();
      this.explanation = expResponse.explanation;
    } catch (error) {
      console.error('Error getting recommendations:', error);
      this.explanation = 'Sorry, there was an error getting recommendations. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  viewMovieDetails(movieId: number) {
    this.router.navigate(['/movies', movieId]);
  }

  trendingMovies(page: number) {
    this._movie.getNowPlaying(page).pipe(delay(2000)).subscribe((res: any) => {
      this.nowPlaying = res.results;
    });
  }

  sliderTimer() {
    setInterval(() => {
      this.current = ++this.current % this.nowPlaying.length;
    }, 5000);
  }
}

import { animate, style, transition, trigger } from '@angular/animations';
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
  public genreslist: any;
  private _selectedFeature;
  private _selectedList = new Map();
  public nowPlaying;
  current=1;
  constructor(private _movie: MoviesService, private router: Router) { }

  ngOnInit() {    
    this.trendingMovies(1);
    this.sliderTimer();
  }

  btnClick(feature) {
    this.showTVMovieBtn = false;
    this._selectedFeature = feature;
    this.getGenres(feature);
  }

  onToggleClick(value, $event) {
    $event.source._checked ? this._selectedList.set(value, true) : this._selectedList.delete(value);
  }

  getGenres(feature?) {
    this._movie.getGenres(feature).pipe(delay(2000)).subscribe((res: any) => {
      this.genreslist = res.genres;
    });
  }

  search() {
    const querystring = Array.from(this._selectedList.keys()).join(",");
    const route = this._selectedFeature == 'movie' ? '/genres' : '/genres-tv';
    this.router.navigateByUrl(`${route}/${querystring}`);
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

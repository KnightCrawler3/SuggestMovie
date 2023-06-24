import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/internal/operators/delay';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-suggest-movie',
  templateUrl: './suggest-movie.component.html',
  styleUrls: ['./suggest-movie.component.scss']
})
export class SuggestMovieComponent {

  public showTVMovieBtn: boolean = true;
  public genreslist: any;
  private _selectedFeature;
  private _selectedList = new Map();
  constructor(private _movie: MoviesService, private router: Router) { }

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
}

import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/internal/operators/delay';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-suggest-movie',
  templateUrl: './suggest-movie.component.html',
  styleUrls: ['./suggest-movie.component.scss']
})
export class SuggestMovieComponent implements OnInit {
  showTVMovieBtn: boolean = true;
  genreslist: any;
  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];
  list = new Map();
  constructor(private _movie: MoviesService) { }

  ngOnInit() {
    this.getGenres();
  }

  btnClick(feature) {
    this.showTVMovieBtn = false;
    this.getGenres(feature);
  }

  onToggleClick(value,$event) {
    if($event.source._checked){
      this.list.set(value,true);
    }else{
      this.list.delete(value);
    }
  }

  getGenres(feature?) {
    this._movie.getGenres().pipe(delay(2000)).subscribe((res: any) => {
      this.genreslist = res.genres;
      //this.loader = false;
    });
  }

  submit(){
    
  }
}

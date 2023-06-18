import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selectedList = new Map();
  constructor(private _movie: MoviesService,private router: Router) { }

  ngOnInit() {
    this.getGenres();
  }

  btnClick(feature) {
    this.showTVMovieBtn = false;
    this.getGenres(feature);
  }

  onToggleClick(value,$event) {
    if($event.source._checked){
      this.selectedList.set(value,true);
    }else{
      this.selectedList.delete(value);
    }
  }

  getGenres(feature?) {
    this._movie.getGenres().pipe(delay(2000)).subscribe((res: any) => {
      this.genreslist = res.genres;
      //this.loader = false;
    });
  }
  searchMovies(){
    let querystring='';
     querystring=Array.from(this.selectedList.keys()).join(",");
    this.router.navigateByUrl(`/genres/${querystring}`);
  }
}

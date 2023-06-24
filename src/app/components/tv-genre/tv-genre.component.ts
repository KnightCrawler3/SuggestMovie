import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { delay } from 'rxjs/internal/operators/delay';
import { MoviesService } from 'src/app/service/movies.service';
import { TvService } from 'src/app/service/tv.service';


@Component({
  selector: 'app-tv-genre',
  templateUrl: './tv-genre.component.html',
  styleUrls: ['./tv-genre.component.scss']
})
export class TvGenreComponent implements OnInit {

  _tv: Object;
  title: string;
  public genrelist: number;
  tvGenre: any;
  constructor(
    private tvService: TvService,
    private router: ActivatedRoute

  ) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.genrelist = params['name'];
      this.title = params['name'];
      this.getTvByGenre();
    });
  }

  getTvByGenre() {
    this.tvService.getShowsByTvGenres(this.genrelist).pipe(delay(2000)).subscribe((res: any) => {
      this.tvGenre = res.results;
    });
  }
  }

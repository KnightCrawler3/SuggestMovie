import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { delay } from 'rxjs/internal/operators/delay';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  topRated: any;
  responsiveOptions;
  loader = true;
  totalResults: any;
  total_results: any;
  // when non-empty, indicates a server-side search is active
  searchStr: string;
  years: number[] = [];
  selectedYear: number | null = null;
  startYear: number | null = null;
  endYear: number | null = null;
  // sorting
  sortOptions = [
    { label: 'Most popular', value: 'popularity.desc' },
    { label: 'Highest rated', value: 'vote_average.desc' },
    { label: 'Lowest rated', value: 'vote_average.asc' },
    { label: 'Newest', value: 'release_date.desc' },
    { label: 'Oldest', value: 'release_date.asc' }
  ];
  selectedSort = 'popularity.desc';

  constructor(private movieService: MoviesService) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  ngOnInit() {
    this.initYears();
    this.loadMovies(1);
  }

  loadMovies(page: number) {
    this.loader = true;
    // If a search string is present, prefer server-side search results (applies to all results)
    if (this.searchStr && this.searchStr.trim().length > 0) {
      this.movieService.searchMovies(this.searchStr.trim(), page).pipe(delay(2000)).subscribe((res: any) => {
        this.topRated = res.results;
        this.totalResults = res.total_results;
        this.loader = false;
      }, error => {
        console.log(error);
        this.loader = false;
      });
      return;
    }
    // If both startYear and endYear are set, use range search
    const sort = this.selectedSort || 'popularity.desc';
    if (this.startYear && this.endYear) {
      // ensure range is ordered
      const s = Math.min(this.startYear, this.endYear);
      const e = Math.max(this.startYear, this.endYear);
      this.movieService.getMoviesByYearRange(s, e, page, sort).pipe(delay(2000)).subscribe((res: any) => {
        this.topRated = res.results;
        this.totalResults = res.total_results;
        this.loader = false;
      }, error => {
        console.log(error);
        this.loader = false;
      });
      return;
    }

    // If selectedYear set, use single-year discover
    if (this.selectedYear) {
      this.movieService.getMoviesByYear(this.selectedYear, page, sort).pipe(delay(2000)).subscribe((res: any) => {
        this.topRated = res.results;
        this.totalResults = res.total_results;
        this.loader = false;
      }, error => {
        console.log(error);
        this.loader = false;
      });
      return;
    }

    // default: top rated
    // if selectedSort is different from default top_rated, use discover to apply sort
    if (this.selectedSort && this.selectedSort !== 'popularity.desc') {
      this.movieService.getDiscover(page, this.selectedSort).pipe(delay(2000)).subscribe((res: any) => {
        this.topRated = res.results;
        this.totalResults = res.total_results;
        this.loader = false;
      }, error => {
        console.log(error);
        this.loader = false;
      });
      return;
    }

    this.movieService.getTopRatedMovies(page).pipe(delay(2000)).subscribe((res: any) => {
      this.topRated = res.results;
      this.totalResults = res.total_results;
      this.loader = false;
    }, error => {
      console.log(error);
      this.loader = false;
    });
  }

  initYears() {
    const currentYear = new Date().getFullYear();
    const startYear = 1950; // reasonable lower bound
    for (let y = currentYear; y >= startYear; y--) {
      this.years.push(y);
    }
  }

  onYearChange(year: number | null) {
    // keep compatibility with single-year selector
    this.selectedYear = year;
    // clear range selections when single year is chosen
    this.startYear = null;
    this.endYear = null;
    this.loadMovies(1);
  }

  onRangeChange() {
    // When using range selector, clear single year selection
    this.selectedYear = null;
    // if both are null, load default
    if (!this.startYear && !this.endYear) {
      this.loadMovies(1);
      return;
    }
    // if only one bound is provided, treat it as single year
    if (this.startYear && !this.endYear) {
      this.selectedYear = this.startYear;
      this.loadMovies(1);
      return;
    }
    if (!this.startYear && this.endYear) {
      this.selectedYear = this.endYear;
      this.loadMovies(1);
      return;
    }
    // both bounds present: use range
    this.loadMovies(1);
  }

  changePage(event) {
    this.loader = true;
    this.loadMovies(event.pageIndex + 1);
  }

  searchMovies() {
    // Kick off a search starting at page 1
    this.loadMovies(1);
  }


}

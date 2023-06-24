import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl: string;
  apiKey: string;
  language: string;
  region: string;
  movieGenresMap = new Map([
    ["Action", 28],
    ["Adventure", 12],
    ["Animation", 16],
    ["Comedy", 35],
    ["Crime", 80],
    ["Documentary", 99],
    ["Drama", 18],
    ["Family", 10751],
    ["Fantasy", 14],
    ["History", 36],
    ["Horror", 27],
    ["Music", 10402],
    ["Mystery", 9648],
    ["Romance", 10749],
    ["Science Fiction", 878],
    ["TV Movie", 10770],
    ["Thriller", 53],
    ["War", 10752],
    ["Western", 37]
  ]);



  constructor(private http: HttpClient) {
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.apiKey = 'dd4d819639705d332d531217b4f7c6b6';
    this.language = 'en-US';
    this.region = 'US';
  }

  getNowPlaying(page: number): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${this.baseUrl}movie/now_playing?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`);
  }

  searchMovies(searchStr: string): Observable<any> {
    return this.http.get(`${this.baseUrl}search/movie?api_key=${this.apiKey}&query=${searchStr}`);
  }

  getPopular(page: number): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${this.baseUrl}movie/popular?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`);
  }

  getUpComingMovies(page: number): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${this.baseUrl}movie/upcoming?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`);
  }

  getTopRatedMovies(page: number): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${this.baseUrl}movie/top_rated?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`);
  }

  getDiscoverMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}discover/movie?api_key=${this.apiKey}`);
  }

  getGenres(feature): Observable<any> {
    return this.http.get(`${this.baseUrl}genre/${feature}/list?api_key=${this.apiKey}&language=${this.language}`);
  }

  getMoveisByMultipleGenres(list) {

    let querystring = [];
    let genrelist = list.split(',');
    genrelist.forEach(key => {
      querystring.push(this.movieGenresMap.get(key));
    });
    return this.http.get(`${this.baseUrl}discover/movie?api_key=${this.apiKey}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${querystring.toString()}`);
  }

  getMoviesByGenre(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}genre/${id}/movies?api_key=${this.apiKey}`);
  }

  getMovie(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}?api_key=${this.apiKey}`);
  }

  getMovieReviews(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}/reviews?api_key=${this.apiKey}`);
  }

  getMovieCredits(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}/credits?api_key=${this.apiKey}`);
  }

  getBackdropsImages(id: string) {
    return this.http.get(`${this.baseUrl}movie/${id}/images?api_key=${this.apiKey}`);
  }

  getMovieVideos(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}/videos?api_key=${this.apiKey}`);
  }

  getRecomendMovies(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}/recommendations?api_key=${this.apiKey}`);
  }

  getPersonDetail(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}person/${id}?api_key=${this.apiKey}`);
  }

  getPersonExternalData(id: string) {
    return this.http.get(`${this.baseUrl}person/${id}/external_ids?api_key=${this.apiKey}`);
  }

  getPersonCast(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}person/${id}/movie_credits?api_key=${this.apiKey}`);
  }

}

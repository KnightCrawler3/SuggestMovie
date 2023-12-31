import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  baseUrl: string;
  apiKey: string;
  language: string;
  region: string;

  tvGenresMap = new Map([
    ["Action & Adventure", 10759],
    ["Animation", 16],
    ["Comedy", 35],
    ["Crime", 80],
    ["Documentary", 99],
    ["Drama", 18],
    ["Family", 10751],
    ["Kids", 10762],
    ["Mystery", 9648],
    ["News", 10763],
    ["Reality", 10764],
    ["Sci-Fi & Fantasy", 10765],
    ["Soap", 10766],
    ["Talk", 10767],
    ["War & Politics", 10768],
    ["Western", 37],
  ]);

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.apiKey = 'dd4d819639705d332d531217b4f7c6b6';
    this.language = 'en-US';
    this.region = 'US';
  }

  getTvOnTheAir(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/on_the_air?api_key=${this.apiKey}&page=${page}&language=${this.language}`);
  }

  getTVAiringToday(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/airing_today?api_key=${this.apiKey}&page=${page}&language=${this.language}`);
  }

  getPopularTVShow(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/popular?api_key=${this.apiKey}&page=${page}&language=${this.language}`);
  }

  getTopRatedTVShows(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/top_rated?api_key=${this.apiKey}&page=${page}&language=${this.language}`);
  }

  getTVShow(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/${id}?api_key=${this.apiKey}&language=${this.language}`);
  }

  getTvVideos(id: any) {
    return this.http.get(`${this.baseUrl}tv/${id}/videos?api_key=${this.apiKey}&language=${this.language}`);
  }

  getTvBackdropsImages(id: string) {
    return this.http.get(`${this.baseUrl}tv/${id}/images?api_key=${this.apiKey}`);
  }

  getMovieCredits(id: string) {
    return this.http.get(`${this.baseUrl}tv/${id}/credits?api_key=${this.apiKey}&language=${this.language}`);
  }

  getGenres(): Observable<any> {
    return this.http.get(`${this.baseUrl}genre/tv/list?api_key=${this.apiKey}&language=${this.language}`);
  }

  getTVShowByGenre(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}discover/tv?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=${id}&include_null_first_air_dates=false`);
  }

  getRecomendTv(id: string) {
    return this.http.get(`${this.baseUrl}tv/${id}/recommendations?api_key=${this.apiKey}&language=${this.language}`);
  }

  searchtv(searchStr: string): Observable<any> {
    return this.http.get(`${this.baseUrl}search/tv?api_key=${this.apiKey}&query=${searchStr}`);
  }

  getShowsByTvGenres(list) {

    const genreIds = list.split(',');
    const querystring = genreIds.map(key => this.tvGenresMap.get(key)).join(',');
    
    return this.http.get(`${this.baseUrl}discover/tv?api_key=${this.apiKey}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${querystring.toString()}`); 
  }

}

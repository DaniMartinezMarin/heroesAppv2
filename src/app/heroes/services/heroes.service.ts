import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Hero } from '../interfaces/hero.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private apiUrl: string = environment.apiEndpoint;

  constructor( private ngHttpClient: HttpClient ) { }

  getHeroesFromDb(): Observable<Hero[]> {
    return this.ngHttpClient.get<Hero[]>(`${ this.apiUrl }/heroes`);
  }

  getHeroeById ( id: string ): Observable<Hero> {
    return this.ngHttpClient.get<Hero>(`${ this.apiUrl }/heroes/${ id }`);
  }

  getHeroesSugerencias ( termino: string ): Observable<Hero[]> {
    return this.ngHttpClient.get<Hero[]>(`${ this.apiUrl }/heroes?q=${ termino }&_limit=6`);
  }

}

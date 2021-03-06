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

  agregarHeroe( heroe: Hero ): Observable<Hero> {
    return this.ngHttpClient.post<Hero>(`${ this.apiUrl }/heroes`, heroe);
  }

  actualizarHeroe( heroe: Hero ): Observable<Hero> {
    return this.ngHttpClient.put<Hero>(`${ this.apiUrl }/heroes/${ heroe.id }`, heroe);
  }

  borrarHeroe( id: string ): Observable<any> {
    return this.ngHttpClient.delete<any>(`${ this.apiUrl }/heroes/${ id }`);
  }

}

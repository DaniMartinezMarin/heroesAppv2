import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../interfaces/hero.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor( private ngHttpClient: HttpClient ) { }

  getHeroesFromDb(): Observable<Hero[]> {
    return this.ngHttpClient.get<Hero[]>('http://localhost:3000/heroes');
  }
}

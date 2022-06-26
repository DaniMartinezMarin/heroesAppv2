import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  private _heroes: Hero[] = [];

  get heroes(): Hero[] {
    return [...this._heroes];
  }

  constructor( private heroesService: HeroesService ) {}

  ngOnInit(): void {
    this.heroesService.getHeroesFromDb()
      .subscribe( ( heroes: Hero[] ) => this._heroes = heroes );
  }
}

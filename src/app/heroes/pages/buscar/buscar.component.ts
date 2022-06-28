import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Hero[] = [];
  heroeSeleccionado: Hero | undefined;

  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {
  }

  getSugerencias(): void {

    if(!this.termino.trim()){
      this.heroes = [];
      return;
    }

    this.heroesService.getHeroesSugerencias( this.termino.trim() )
      .subscribe( ( heroes: Hero[] ) => this.heroes = heroes )
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ): void {

    if(!event.option.value){
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Hero = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroeById( heroe.id! )
      .subscribe( (heroe: Hero) => this.heroeSeleccionado = heroe );
  }

}

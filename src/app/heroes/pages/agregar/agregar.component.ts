import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: Hero = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.MarvelComics,
    alt_img: '',
  };

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    if( !this.router.url.includes('editar') ) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroeById( id ) )
      )
      .subscribe( (heroe: Hero) => this.heroe = heroe );
  }

  guardar(): void {

    if ( this.heroe.superhero.trim().length === 0 ) {
      return;
    }

    if ( this.heroe.id ) {
      //Actualizar
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe( (heroe: Hero) => console.log('Actualizando', heroe) );
    } else {
      //Crear
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe( (heroe: Hero) => {
            this.router.navigate(['/heroes/editar', heroe.id]);
          }
        );
    }

  }
}

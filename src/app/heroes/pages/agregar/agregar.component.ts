import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
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
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
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
        .subscribe( (heroe: Hero) => this.openSnackBar(`${heroe.superhero} actualizado!`));
    } else {
      //Crear
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe( (heroe: Hero) => {
            this.openSnackBar(`${heroe.superhero} creado!`);
            this.router.navigate(['/heroes/editar', heroe.id]);
          }
        );
    }
  }

  borrarHeroe() {

    const dialog = this.dialog.open( ConfirmarComponent, {
      width: '30%',
      data: { ...this.heroe }
    });

    dialog.afterClosed().subscribe(
      (confirmarBorrado) => {
        if(confirmarBorrado) {
          this.heroesService.borrarHeroe( this.heroe.id! )
            .subscribe( resp => {
              this.openSnackBar(`${this.heroe.superhero} borrado!`);
              this.router.navigate(['heroes']);
            });
        }
      }
    )
  }

  openSnackBar( mensaje: string ) {
    this.snackBar.open( mensaje, "Aceptar", {
      duration: 2500
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css'],
})
export class HeroeComponent implements OnInit {
  heroe!: Hero;

  constructor(
    private ngActivatedRoute: ActivatedRoute,
    private heroService: HeroesService
  ) {}

  ngOnInit(): void {
    this.ngActivatedRoute.params
      .pipe(
        switchMap(
          ({ id }) => this.heroService.getHeroeById(id).pipe( delay(1000) ) //Transformamos el observable de parametros en el observable de heroe y le aplicamos 1000 de delay
        )
      )
      .subscribe((heroe: Hero) => {
        this.heroe = heroe;
      });
  }


}

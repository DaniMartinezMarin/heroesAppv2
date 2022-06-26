import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';


@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(hero: Hero): string {

    const path = `assets/heroes/${hero.id}.jpg`;
    return path;

    /* return (existsSync(path)) ?  path : '`assets/heroes/no-image.png'; */
  }

}

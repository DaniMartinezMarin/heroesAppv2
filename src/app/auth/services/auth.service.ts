import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthInterface } from '../interfaces/auth-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.apiEndpoint;
  private _auth: AuthInterface | undefined;

  get auth(): AuthInterface {
    return {...this._auth!};
  }

  constructor( private htpp: HttpClient ) { }

  login(): Observable<AuthInterface>{
    return this.htpp.get<AuthInterface>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap( (auth: AuthInterface) => this._auth = auth )
      );
  }
}

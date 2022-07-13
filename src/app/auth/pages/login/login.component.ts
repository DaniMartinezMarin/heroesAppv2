import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthInterface } from '../../interfaces/auth-interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(private router: Router, private authService: AuthService) {}

  login() {

    this.authService.login()
      .subscribe( (user: AuthInterface) => {
        console.log(user);
      });

    this.router.navigate(['./heroes']);
  }
}

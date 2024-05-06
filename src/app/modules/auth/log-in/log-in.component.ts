import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  constructor(
    private authService: AuthService
  ) {}

  login() {
    console.log(this.getInputs());
    this.authService.login(this.getInputs()).subscribe({
      next: (res) => {
        this.authService.logout();
        if(res.status === 200) {
          let token = "Token " + res.body['token'];
          this.authService.setToken(token);
          console.log(token);
          this.authService.isLoggedIn = true;
        }
      },
      error: (err) => {
        console.log(err.error);
        this.authService.isLoggedIn = false;
        throw err;
      },
    });

  }

  private getInputs() {
    const HTMLElemets = {
      email: (document.getElementById("email") as HTMLInputElement).value,
      password: (document.getElementById("password") as HTMLInputElement).value
    };
    return HTMLElemets;
  }
}

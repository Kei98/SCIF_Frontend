import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  showModal = false;
  message = '';

  constructor(
    private authService: AuthService,
    private router:Router
  ) {}

  login() {
    // debugger;
    this.closeModal();
    this.authService.login(this.getInputs()).subscribe({
      next: (res) => {
        this.authService.logout();
        if(res.status === 200) {
          let token = "Token " + res.body['token'];
          let role = res.body['user']['role'];
          this.authService.setToken(token);
          this.authService.setUserRole(role);
          this.authService.isLoggedIn = true;
          this.router.navigateByUrl('/products/admin');
        }
      },
      error: (err) => {
        // console.log(err.error);
        this.openModal('No user found with the provided credentials');
        this.authService.isLoggedIn = false;
        throw err;
      },
    });

  }

  openModal(message:any) {
    this.message = message;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.message = '';
  }

  private getInputs() {
    const HTMLElemets = {
      email: (document.getElementById("email") as HTMLInputElement).value,
      password: (document.getElementById("password") as HTMLInputElement).value
    };
    return HTMLElemets;
  }
}

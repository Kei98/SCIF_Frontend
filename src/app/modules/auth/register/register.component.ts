import {
  Component,
  OnInit,
} from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
    protected existingUser = false;
    showModal = false;
    message = '';
    password: string = '';
    confirmPassword: string = '';
    passwordsMatch: boolean = true;

    constructor(private authService: AuthService) { }
  ngOnInit(): void {
    //load User roles
  }

  denyExistingUser() {
    this.existingUser = !this.existingUser;
  }

  createUser() {
    this.closeModal();
    this.authService.create(this.getInputs()).subscribe({
      next: (res) => {
        if(res.status === 200) {
          this.openModal('User created successfully');
        }
      },
      error: (err) => {
        // console.log(err.error);
        this.openModal('Passwords must match');
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

  checkPasswordsMatch() {
    this.passwordsMatch = this.password === this.confirmPassword;
  }
}

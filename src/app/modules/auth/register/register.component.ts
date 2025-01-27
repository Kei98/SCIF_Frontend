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

  // createUser() {
  //   this.closeModal();
  //   this.authService.create(this.getUserInputs()).subscribe({
  //     next: (res) => {
  //       if(res.status === 200) {
  //         this.openModal('User created successfully');
  //       }
  //     },
  //     error: (err) => {
  //       // console.log(err.error);
  //       this.openModal('Passwords must match');
  //       this.authService.isLoggedIn = false;
  //       throw err;
  //     },
  //   });

  // }

  createUser() {
    const user = {
      id: 0,
      email: (document.getElementById("UserEmail") as HTMLInputElement).value,
      password: (document.getElementById("Password") as HTMLInputElement).value,
      role: 4,
    };
    const user_info = {
      user_info_name: (document.getElementById("Name") as HTMLInputElement).value,
      user_info_id_card: (document.getElementById("ID-Card") as HTMLInputElement).value,
      user_info_tel_number: (document.getElementById("Telephone") as HTMLInputElement).value,
      user_info_email: (document.getElementById("Email") as HTMLInputElement).value,
      user_info_address: (document.getElementById("Address") as HTMLInputElement).value,
      user_info_active: true
    };
    const user_contact_info = {
      user_contact_number: (document.getElementById("ContactTelephone") as HTMLInputElement).value,
      user_contact_name: (document.getElementById("ContactName") as HTMLInputElement).value,
      user_contact_active: true,
      user_info: 0
    };

    const body = { user: user, user_info: user_info, user_contact_info: user_contact_info };
      this.authService.create(body).subscribe({
        next: (res) => {
          if (res.status === 201) {
            this.openModal('User created successfully');
            this.clearForm();
          }else {
            this.openModal('User could not be created. Contact support team');
          }
        },
        error: (err) => {
          this.openModal('User could not be created. Contact support team. Error: ' + err);
        },
      });
  }

  clearForm() {
    const inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].type === 'text' || inputs[i].type === 'email' || inputs[i].type === 'password') {
        inputs[i].value = '';
      }
    }
  }
  setSameEmail() {
    const activeElement = document.getElementById('SameEmail') as HTMLInputElement;
    let active = activeElement ? activeElement.checked : false;
    if (active) {
      const email = (document.getElementById("Email") as HTMLInputElement).value;
      (document.getElementById("UserEmail") as HTMLInputElement).value = email;
    }else {
      (document.getElementById("UserEmail") as HTMLInputElement).value = '';
    }
  }
  openModal(message:any) {
    this.message = message;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.message = '';
  }

  // private getUserInputs() {
  //   const HTMLElemets = {
  //     email: (document.getElementById("UserEmail") as HTMLInputElement).value,
  //     password: (document.getElementById("Password") as HTMLInputElement).value
  //   };
  //   return HTMLElemets;
  // }

  checkPasswordsMatch() {
    this.passwordsMatch = this.password === this.confirmPassword;
  }
}

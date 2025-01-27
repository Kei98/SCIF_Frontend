import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  password: string = '';
  confirmPassword: string = '';
  passwordsMatch: boolean = true;
  showModal = false;
  message = '';
  user_role_list: any[] = [
    {id:'1',user_role_name: 'Admin'},
    {id:'2', user_role_name:'Project Manager'},
    {id:'3', user_role_name:'Seller'},
    {id:'4', user_role_name:'Customer'}
    ];

  reset_password=false;

  constructor(private authService: AuthService) { }

    ngOnInit(): void {
      //load User roles
    }
    changeResetPassword(){
      this.reset_password=!this.reset_password;
    }
    openModal(message:any) {
      this.message = message;
      this.showModal = true;
    }

    closeModal() {
      this.showModal = false;
      this.message = '';
    }

    checkPasswordsMatch() {
      this.passwordsMatch = this.password === this.confirmPassword;
    }

    userRoleSelected(user_role: any) {

      console.log('User role selected:', user_role);

    }

}

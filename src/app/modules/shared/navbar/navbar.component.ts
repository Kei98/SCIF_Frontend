import { Component, OnInit } from '@angular/core';
import { faCartPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cart_icon = faCartPlus;

  constructor(private authService: AuthService) {
  }

  user_icon = faUser;
  ngOnInit(): void {

  }
  isAuthenticated() {
    return this.authService.isLoggedIn;
  }

  getUserRole() {
    return this.authService.getUserRole();
  }

  isAdmin() {
    return this.getUserRole() == '1';
  }

  isProjectManager() {
    return this.getUserRole() === '3';
  }

  isAdminOrProjectManager() {
    return this.isAdmin() || this.isProjectManager();
  }

  logout() {
    this.authService.logout();
  }
}

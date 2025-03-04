import { Injectable } from '@angular/core';
import { SCIFService } from '../../shared/services/scif.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends SCIFService{

  constructor(http:HttpClient) {
    super(http);
  }

  isLoggedIn: boolean = false;

  private sharedDataSubject = new BehaviorSubject<string>(''); // Initial value is an empty string
  sharedData$ = this.sharedDataSubject.asObservable();

  setSharedData(data: any): void {
    this.sharedDataSubject.next(data);
  }

  logout(): void {
    localStorage.removeItem('JWT_Token');
    localStorage.removeItem('USER_ROLE_ID');
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    this.refreshIsLoggedIn();
    return this.isLoggedIn;
  }

  isAuthorized(): boolean {
    this.refreshIsLoggedIn();
    return this.isLoggedIn;
  }

  setToken(token:any) {
    localStorage.setItem('JWT_Token', token);
  }

  getToken() {
    return localStorage.getItem('JWT_Token');
  }

  setUserRole(userRoleId:any) {
    return localStorage.setItem('USER_ROLE_ID', userRoleId);
  }

  getUserRole() {
    return localStorage.getItem('USER_ROLE_ID');
  }

  setUserId(userId:any) {
    return localStorage.setItem('USER_ID', userId);
  }

  getUserId() {
    return localStorage.getItem('USER_ID');
  }

  refreshIsLoggedIn() {
    if(this.getToken() != null) {
      this.isLoggedIn = true;
      return;
    }
    this.isLoggedIn = false;
  }

  login(body:any): Observable<any> {
    return this.http.post(environment.URL + 'login', body, {observe: 'response'});
  }

  create(body:any): Observable<any> {
    return this.http.post(environment.URL + 'create/', body, {observe: 'response'});
  }

  reset_password(body:any): Observable<any> {
    return this.http.post(environment.URL + 'password-reset/', body, { withCredentials: true, observe: 'response'});
  }

}

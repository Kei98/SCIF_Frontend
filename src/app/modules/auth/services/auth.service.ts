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
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  setToken(token:any) {
    localStorage.setItem('JWT_Token', token);
  }

  login(body:any): Observable<any> {
    return this.http.post(environment.URL + 'login', body, {observe: 'response'});
  }

}

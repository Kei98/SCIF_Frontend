import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  constructor () {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger;
    const authToken = localStorage.getItem('JWT_Token');
    if (!authToken) {
      // return next
    }
    req = req.clone({
      setHeaders: {
        Authorization: `${authToken}`
      }
    });

    return next.handle(req);
  }
}

export const jWTInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
];
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const csrfToken = this.getCookie('csrftoken'); // Fetch the CSRF token from cookies

    if (csrfToken) {
        request = request.clone({
            setHeaders: {
                'X-CSRFToken': csrfToken,
            },
        });
    }

    return next.handle(request);
}

private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
}
}


export const cSRFInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true },
];


import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './services/auth.service';
import {inject} from "@angular/core";
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state):
Observable<boolean | UrlTree>
| Promise<boolean | UrlTree>
| boolean
| UrlTree => {
  console.log(inject(AuthService).isAuthenticated());

  return inject(AuthService).isAuthenticated() ? true : inject(Router).createUrlTree(['/login'])

    //   if (isauthenticated) {
    //    return true;
    //  } else {
    //   inject(Router).navigate(['/login']);
    //    return false;
    //  }
};

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { JWTInterceptor, jWTInterceptorProviders } from './modules/auth/jwt.interceptor';
// import { authGuard } from './modules/auth/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { FlexmonsterPivotModule } from 'ngx-flexmonster';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    // FlexmonsterPivotModule
  ],
  providers: [
    // authGuard,
    { provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    },
    // jWTInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

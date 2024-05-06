import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { JWTInterceptor, jWTInterceptorProviders } from './modules/auth/jwt.interceptor';
// import { authGuard } from './modules/auth/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    // authGuard,
    jWTInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

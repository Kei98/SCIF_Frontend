import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceComponent } from './service/service.component';
import { authGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
        path: 'service',
        component: ServiceComponent,
        canActivate: [authGuard]
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }

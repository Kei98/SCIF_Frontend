import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { authGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
      path: 'orders',
      component: OrderComponent,
      canActivate: [authGuard]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }

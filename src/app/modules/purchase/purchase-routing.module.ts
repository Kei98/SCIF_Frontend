import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseComponent } from './purchase/purchase.component';
import { authGuard } from '../auth/auth.guard';

const routes: Routes = [
    {
      path: 'purchase',
      component: PurchaseComponent,
      canActivate: [authGuard]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }

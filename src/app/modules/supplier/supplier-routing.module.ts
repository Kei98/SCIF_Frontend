import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierAddComponent } from './supplier-add/supplier-add.component';
import { authGuard } from '../auth/auth.guard';
import { SupplierAdminComponent } from './supplier-admin/supplier-admin.component';

const routes: Routes = [
  {
    path: 'supplier',
    component: SupplierAddComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: SupplierAdminComponent,
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }

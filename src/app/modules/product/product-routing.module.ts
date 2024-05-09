import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ProductAddComponent } from './product-add/product-add.component';
import { TableTestComponent } from './table-test/table-test.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { ProductCustomerComponent } from './product-customer/product-customer.component';
import { authGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: ProductAdminComponent,
    canActivate: [authGuard]
  },
  {
    path: 'products',
    component: ProductCustomerComponent,
    canActivate: [authGuard]
  },
  {
    path: 'test',
    component: TableTestComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

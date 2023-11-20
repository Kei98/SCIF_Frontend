import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from './modules/product/product-add/product-add.component';
import { NotFoundComponent } from './modules/shared/not-found/not-found.component';

// const productModule = () => import('./modules/customer/customer.module').then((module) => CustomerModule);

const routes: Routes = [
  {
    path: 'products/add',
    component: ProductAddComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  },
  
  // {
  //   path: '**',
  //   redirectTo: '**'
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

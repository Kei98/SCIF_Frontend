import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// const productModule = () => import('./modules/customer/customer.module').then((module) => CustomerModule);

const routes: Routes = [
  // {
  //   path: 'not-found',
  //   component: NotFoundComponent
  // },
  // {
  //   path: 'customer',
  //   loadChildren: customerModule
  // },
  // {
  //   path: '**',
  //   redirectTo: 'not-found'
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

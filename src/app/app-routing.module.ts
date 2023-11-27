import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/shared/not-found/not-found.component';
import { ProductModule } from './modules/product/product.module';

const productModule = () => import('./modules/product/product.module').then((module) => ProductModule);

const routes: Routes = [
  {
    path: 'products',
    loadChildren: productModule
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

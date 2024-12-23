import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/shared/not-found/not-found.component';
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';
import { authGuard } from './modules/auth/auth.guard';
import { ReportsModule } from './modules/reports/reports.module';
import { SalesModule } from './modules/sales/sales.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { HomeComponent } from './modules/shared/home/home.component';

const productModule = () => import('./modules/product/product.module').then((module) => ProductModule);
const authModule = () => import('./modules/auth/auth.module').then((module) => AuthModule);
const reportsModule = () => import('./modules/reports/reports.module').then((module) => ReportsModule);
const salesModule = () => import('./modules/sales/sales.module').then((module) => SalesModule);
const supplierModule = () => import('./modules/supplier/supplier.module').then((module) => SupplierModule);
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: authModule,
    // redirectTo:'login',
    // pathMatch:'full'
  },
  {
    path: 'products',
    loadChildren: productModule,
    canActivate: [authGuard],
    data: {role_id: [1]}
  },
  {
    path: 'suppliers',
    loadChildren: supplierModule,
    canActivate: [authGuard]
  },
  {
    path: 'reports',
    loadChildren: reportsModule,
    canActivate: [authGuard]
  },
  {
    path: 'sales',
    loadChildren: salesModule,
    canActivate: [authGuard]
  },
  // {
  //   path: '',
  //   component: LayoutComponent,
  //   children: [
  //     {
  //       path: 'products',
  //       loadChildren: productModule,
  //       canActivate: [authGuard]
  //     },
  //   ]
  // },
  {
    path: '**',
    component: NotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

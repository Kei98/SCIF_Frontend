import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report/report.component';
import { authGuard } from '../auth/auth.guard';
import { PurchaseSaleReportComponent } from './purchase-sale-report/purchase-sale-report.component';

const routes: Routes = [
  {
    path: 'report',
    component: ReportComponent,
    canActivate: [authGuard]
  },
  {
    path: 'purchase-sale-report',
    component: PurchaseSaleReportComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }

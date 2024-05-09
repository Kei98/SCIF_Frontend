import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportComponent } from './report/report.component';
import { FlexmonsterPivotModule } from 'ngx-flexmonster';


@NgModule({
  declarations: [
    ReportComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    FlexmonsterPivotModule
  ]
})
export class ReportsModule { }
